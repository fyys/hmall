"use strict";!function(l){var o=l("#loutinav"),s=l("#loutinav li"),i=l("#main-louceng .louceng"),n=l("#loutinav ul li.last");function t(){500<=l(window).scrollTop()?o.show():o.hide(),l(window).on("scroll",function(){var t=l(window).scrollTop();500<=t?o.show():o.hide(),i.each(function(o,i){var n=l(this).offset().top+l(i).outerHeight()/2;if(t<n)return s.removeClass("active"),s.eq(o).addClass("active"),!1})})}t(),s.not(".last").on("click",function(){l(this).addClass("active").siblings("li").removeClass("active"),l(window).off();var o=i.eq(l(this).index()).offset().top;l("html,body").animate({scrollTop:o},function(){l(window).on("scroll",function(){t()})})}),n.on("click",function(){l("html,body").animate({scrollTop:0})})}(jQuery);