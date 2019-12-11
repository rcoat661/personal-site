'use strict';

import $ from 'jquery';

module.exports = class WorkSection {
  constructor($el) {
    this.$el = $el;
    this.$spinner = this.$el.find('.spinner');
    let $feed = this.$el.find('#ig-feed');


    // ig gallery feed
    $.ajax({
      type: 'GET',
      url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=209572101.779eade.1366db92f5394143b14a6ccd7ab43cb1',
      dataType: 'json',
      success: (data) => {
        if (data) {
          this.initLoadSuccess();
          this.loadFeed($feed, data);
          let accordionTrigger = this.$el.find('.accordion-trigger');
          accordionTrigger.each((index, item) => {
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

  }

  loadFeed(feed, data) {
    for (let i = 0; i < data.data.length; i++) {
      let value = data.data[i],
        index = i,
        sampleImage = '/images/sample-jawn.jpg';

      if (value.type == 'video' && index <= 11) {
        feed.append(`
          <div class="feed-item video">
            <div class="media-container">
              <video autoplay loop muted poster="${sampleImage}">
                <source src="${sampleImage}" type="video/mp4" />
              </video>
            </div>
          </div>`);
      } else if (index <= 11) {
        feed.append(`
          <div class="feed-item" style="background-image: url('${sampleImage}')">
            <div class="media-container">
              <img src="${sampleImage}" alt="${value.caption.text}" />
            </div>
          </div>`);
      }
    }
  }

  initLoadSuccess() {
    this.$spinner.hide()
  }

};
