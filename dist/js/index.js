"use strict";!function(n){var i=n("#loutinav"),a=n("#loutinav li"),o=n("#main-louceng .louceng"),s=n("#loutinav ul li.last"),e=n(".box");function t(){var t=n(window).scrollTop();143<=t?e.stop().css({position:"fixed"}).addClass("fixed").animate({top:0},200,"swing").children().css({"padding-top":"5px"}):e.stop().css({position:"static"}).removeClass("fixed").animate({top:-110},200,"swing").children().css({"padding-top":"20px"}),500<=t?i.show():i.hide(),o.each(function(i,o){var s=n(this).offset().top+n(o).outerHeight()/2;if(t<s)return a.removeClass("active"),a.eq(i).addClass("active"),!1}),n(window).on("scroll",function(){var t=n(window).scrollTop();143<=t?e.stop().css({position:"fixed"}).addClass("fixed").animate({top:0},200,"swing").children().css({"padding-top":"5px"}):e.stop().css({position:"static"}).removeClass("fixed").animate({top:-110},200,"swing").children().css({"padding-top":"20px"}),500<=t?i.show():i.hide(),o.each(function(i,o){var s=n(this).offset().top+n(o).outerHeight()/2;if(t<s)return a.removeClass("active"),a.eq(i).addClass("active"),!1})})}t(),a.not(".last").on("click",function(){n(this).addClass("active").siblings("li").removeClass("active"),n(window).off();var i=o.eq(n(this).index()).offset().top;n("html,body").animate({scrollTop:i},function(){n(window).on("scroll",function(){t()})})}),s.on("click",function(){n("html,body").animate({scrollTop:0})})}(jQuery);