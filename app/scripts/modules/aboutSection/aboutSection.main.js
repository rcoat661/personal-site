'use strict';

import $ from 'jquery';

module.exports = class AboutSection {
  constructor($el) {
    this.$el = $el;
    this.$spinner = this.$el.find('.spinner')
    let $footballContent = $('#football');
    let $teamButton = this.$el.find('.team');
    let $teamModal = this.$el.find('.team-modal');
    let $teamModalClose = $teamModal.find('.close');
    let $feed = this.$el.find('#ig-feed');

    $teamButton.on('click', (e) => {
      e.preventDefault();
      if ($teamButton.hasClass('active')) {
        $teamButton.removeClass('active')
        $teamModal.fadeOut()
      } else {
        $teamButton.addClass('active');
        $teamModal.fadeIn();
      }
    });

    $teamModalClose.on('click', (e) => {
      e.preventDefault();
      $teamButton.removeClass('active')
      $teamModal.fadeOut()
    });


    // ig gallery feed
    $.ajax({
      type: 'GET',
      url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=209572101.779eade.6e53fee6199c4387ab47f3987bd16cf2',
      dataType: 'json',
      success: (data) => {
        if (data) {
          this.initLoadSuccess();
          this.loadFeed($feed, data);
          let accordionTrigger = this.$el.find('.accordion-trigger');
          accordionTrigger.each((index,item) => {
            let accordionContent = $(item).next();
            let activeState = 'active';
            $(item).on('click', (e) => {
              e.preventDefault();
              if ($(item).hasClass(activeState)) {
                $(item).removeClass(activeState);
                accordionContent.stop(true, true).slideUp(200);
              } else {
                $(item).addClass(activeState);
                accordionContent.stop(true, true).slideDown(200);
              }
            });
          });
        }
      }
    })

    // epl api feed
    $.getJSON('http://soccer.sportsopendata.net/v1/leagues/premier-league/seasons', (obj) => {

      $.each(obj, (key, value) => {
        $.each(value.seasons, (index, item) => {
          if (index === 0) {
            let seasonSlug = item.season_slug;
            $('span.year').append(seasonSlug);
            // get cached JSON from Last.fm
            $.getJSON('http://soccer.sportsopendata.net/v1/leagues/premier-league/seasons/' + seasonSlug + '/standings', (obj) => {
              $.each(obj, (key, value) => {
                $.each(value.standings, (index, item) => {
                  if (index < 1) {
                    $footballContent.append(this.tableHeader());
                  }
                  $footballContent.append(this.tableItem(value.standings[index], index));
                });
              });
            });

          }
        });
      });
    });
  }

  tableHeader() {
    return (`<div class="table-header">
        <div class="position">
          <span>Position</span>
        </div>
        <div class="team">
          <span>Team</span>
        </div>
        <div class="wins">
          <span>Wins</span>
        </div>
        <div class="losses">
          <span>Losses</span>
        </div>
        <div class="points">
          <span>Points</span>
        </div>
      </div>`)
  }

  tableItem(teamItem, index) {
    let teamClass;
    if (index == 0) {
      teamClass = ' leader';
    } else if (index >= 1 && index <= 3) {
      teamClass = ' top-four';
      if (teamItem.team == 'Tottenham') {
        teamClass = ' top-four spurs'
      }
    } else {
      if (teamItem.team == 'Tottenham') {
        teamClass = ' top-four spurs'
      }
      teamClass = '';
    }
    return (`<div class="table-item${teamClass}">
        <div class="position">
          <span class="number">${teamItem.position}</span>
        </div>
        <div class="team">
          <span class="teamname">${teamItem.team}</span>
        </div>
        <div class="wins">
          <span class="number">${teamItem.overall.wins}</span>
        </div>
        <div class="losses">
          <span class="number">${teamItem.overall.losts}</span>
        </div>
        <div class="points">
          <span class="number">${teamItem.overall.points}</span>
        </div>
      </div>`)
  }

  loadFeed(feed, data) {
    $.each(data.data, function(index, value) {
      if (value.type == 'video' && index <= 7) {
        feed.append(`
          <div class="feed-item video">
            <div class="media-container">
              <video controls poster="${value.images.standard_resolution.url}">
                <source src="${value.videos.standard_resolution.url}" type="video/mp4" />
              </video>
            </div>
            <div class="content">
              <div class="caption">
                <div class="likes">
                  <div class="heart"></div>
                  <div class="count">${value.likes.count}</div>
                </div>
                <div class="link">
                  <a target="_blank" href="${value.link}"><span class="icon icon-share"></span></a>
                </div>
                <h4>${value.caption.text}</h4>
                <span class="location"><a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${value.location.name}">${value.location.name}</a></span>
              </div>
            </div>
          </div>`);
      } else if (index <= 7) {
        feed.append(`
          <div class="feed-item">
            <div class="media-container">
              <img src="${value.images.standard_resolution.url}" alt="${value.caption.text}" />
            </div>
            <div class="content">
              <div class="caption">
                <div class="likes">
                  <div class="heart"></div>
                  <div class="count">${value.likes.count}</div>
                </div>
                <div class="link">
                  <a target="_blank" href="${value.link}"><span class="icon icon-share"></span></a>
                </div>
                <h4>${value.caption.text}</h4>
                <span class="location"><a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${value.location.name}">${value.location.name}</a></span>
              </div>
            </div>
          </div>`);
      }
    });
  }

  initLoadSuccess() {
    this.$spinner.hide()
  }

};
