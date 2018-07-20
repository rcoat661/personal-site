'use strict';

import $ from 'jquery';

module.exports = class MusicSection {
  constructor($el) {
    this.$el = $el;
    this.$spinner = this.$el.find('.spinner')
    let musicContent = this.$el.find('#music-artists .inner-container');
    let nowPlayingItem = this.$el.find('#now-playing .inner-container');
    let getTracksJson = 'http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=rcoat661&api_key=0ee4715a1d3c20293f5511f76cd15bd2&format=json';

    // get cached JSON from Last.fm
    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=rcoat661&api_key=0ee4715a1d3c20293f5511f76cd15bd2&format=json', function(obj) {
      $.each(obj, function(key, value) {
        $.each(value.artist, function(index, item) {
          if (index <= 5) {
            musicContent.append('<div class="music-artist"><img src="' + value.artist[index].image[3]['#text'] + '" /><div class="name">' + value.artist[index].name + '</div></div>');
          }
        });
      });
    });

    this.onLoadList(nowPlayingItem, getTracksJson);
    this.loopThrough(nowPlayingItem, getTracksJson);

  }

  onLoadList(nowPlayingItem, getTracksJson) {
    $.getJSON(getTracksJson, (data) => {
      if (data) {
        $.each(data, (key, value) => {
          $.each(value.track, (index, item) => {
            if (index <= 0) {
              if (item['@attr']) {
                nowPlayingItem.append(this.listItemCurrent(item));
              } else {
                nowPlayingItem.append(this.listItem(item));
              }
            } else if (index > 0 && index <= 7) {
              nowPlayingItem.append(this.listItem(item));
            }
          });
        });
      }
    }).done(() => {
      this.$spinner.hide();
    })
  }

  loopThrough(nowPlayingItem, newJson) {
    let current = null,
      previous = null;
    setInterval(() => {
      $.getJSON(newJson, (data) => {
        current = JSON.stringify(data);
        if (previous && current && previous !== current) {
          this.$spinner.show();
          $(nowPlayingItem).html('');
          this.onLoadList(nowPlayingItem, newJson)
        }
        previous = current;
      })
    }, 10000);
  }

  listItemCurrent(item) {
    return (`
    <div class="music-artist current">
      <div class="container">
          <div class="meta">
            <div id='bars'>
              <div class='bar'></div>
              <div class='bar'></div>
              <div class='bar'></div>
              <div class='bar'></div>
              <div class='bar'></div>
              <div class='bar'></div>
              <div class='bar'></div>
              <div class='bar'></div>
              <div class='bar'></div>
              <div class='bar'></div>
            </div>
          </div>
          <div class="content">
            <p><strong>${item.artist['#text']}</strong>${item.name}</p>
          </div>
      </div>
    </div>`)
  }

  listItem(item) {
    let date = new Date(item.date['#text']);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hrs = date.getHours();
    let mid = 'AM';
    let newHrs = hrs - 4;
    if (newHrs > 12) {
        newHrs -= 12;
        mid = 'PM';
    } else {
        mid = 'AM';
    }
    let mins = date.getMinutes();
    if (mins < 10) {
      mins = '0' + mins
    }
    let timezone
    return (`
      <div class="music-artist">
        <div class="container">
          <div class="meta">
            <div class="date">
              <span class="month">${month}</span>
              <span class="day">${day}</span>
            </div>
          </div>
          <div class="content">
            <p><strong>${item.artist['#text']}</strong>${item.name}</p>
            <span class="time">${newHrs}:${mins}${mid}</span>
          </div>
        </div>
      </div>`)
  }

};
