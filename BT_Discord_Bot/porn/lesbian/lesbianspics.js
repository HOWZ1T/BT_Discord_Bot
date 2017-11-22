/*!
@lesbianspics.com
*/
(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){function i(t){n(function(){var i,e;for(i=0;t.length>i;i++)e=t[i],e.obj.css(e.css)})}function e(i){return t.trim(i).toLowerCase()}var s,h,o;o=function(t,i){return function(){return t.apply(i,arguments)}},h={align:"center",autoResize:!1,comparator:null,container:t("body"),direction:void 0,ignoreInactiveItems:!0,itemWidth:0,fillEmptySpace:!1,flexibleWidth:0,offset:2,outerOffset:0,onLayoutChanged:void 0,possibleFilters:[],resizeDelay:50,verticalOffset:void 0};var n=window.requestAnimationFrame||function(t){t()},r=t(window);s=function(){function s(i,e){this.handler=i,this.columns=this.containerWidth=this.resizeTimer=null,this.activeItemCount=0,this.itemHeightsDirty=!0,this.placeholders=[],t.extend(!0,this,h,e),this.verticalOffset=this.verticalOffset||this.offset,this.update=o(this.update,this),this.onResize=o(this.onResize,this),this.onRefresh=o(this.onRefresh,this),this.getItemWidth=o(this.getItemWidth,this),this.layout=o(this.layout,this),this.layoutFull=o(this.layoutFull,this),this.layoutColumns=o(this.layoutColumns,this),this.filter=o(this.filter,this),this.clear=o(this.clear,this),this.getActiveItems=o(this.getActiveItems,this),this.refreshPlaceholders=o(this.refreshPlaceholders,this),this.sortElements=o(this.sortElements,this),this.updateFilterClasses=o(this.updateFilterClasses,this),this.updateFilterClasses(),this.autoResize&&r.bind("resize.wookmark",this.onResize),this.container.bind("refreshWookmark",this.onRefresh)}return s.prototype.updateFilterClasses=function(){for(var t,i,s,h,o=0,n=0,r=0,a={},l=this.possibleFilters;this.handler.length>o;o++)if(i=this.handler.eq(o),t=i.data("filterClass"),"object"==typeof t&&t.length>0)for(n=0;t.length>n;n++)s=e(t[n]),a[s]===void 0&&(a[s]=[]),a[s].push(i[0]);for(;l.length>r;r++)h=e(l[r]),h in a||(a[h]=[]);this.filterClasses=a},s.prototype.update=function(i){this.itemHeightsDirty=!0,t.extend(!0,this,i)},s.prototype.onResize=function(){clearTimeout(this.resizeTimer),this.itemHeightsDirty=0!==this.flexibleWidth,this.resizeTimer=setTimeout(this.layout,this.resizeDelay)},s.prototype.onRefresh=function(){this.itemHeightsDirty=!0,this.layout()},s.prototype.filter=function(i,s,h){var o,n,r,a,l,f=[],u=t();if(i=i||[],s=s||"or",h=h||!1,i.length){for(n=0;i.length>n;n++)l=e(i[n]),l in this.filterClasses&&f.push(this.filterClasses[l]);if(o=f.length,"or"==s||1==o)for(n=0;o>n;n++)u=u.add(f[n]);else if("and"==s){var c,d,m,p=f[0],g=!0;for(n=1;o>n;n++)f[n].length<p.length&&(p=f[n]);for(p=p||[],n=0;p.length>n;n++){for(d=p[n],g=!0,r=0;f.length>r&&g;r++)if(m=f[r],p!=m){for(a=0,c=!1;m.length>a&&!c;a++)c=m[a]==d;g&=c}g&&u.push(p[n])}}h||this.handler.not(u).addClass("inactive")}else u=this.handler;return h||(u.removeClass("inactive"),this.columns=null,this.layout()),u},s.prototype.refreshPlaceholders=function(i,e){for(var s,h,o,n,r,a,l=this.placeholders.length,f=this.columns.length,u=this.container.innerHeight();f>l;l++)s=t('<div class="wookmark-placeholder"/>').appendTo(this.container),this.placeholders.push(s);for(a=this.offset+2*parseInt(this.placeholders[0].css("borderLeftWidth"),10),l=0;this.placeholders.length>l;l++)if(s=this.placeholders[l],o=this.columns[l],l>=f||!o[o.length-1])s.css("display","none");else{if(h=o[o.length-1],!h)continue;r=h.data("wookmark-top")+h.data("wookmark-height")+this.verticalOffset,n=u-r-a,s.css({position:"absolute",display:n>0?"block":"none",left:l*i+e,top:r,width:i-a,height:n})}},s.prototype.getActiveItems=function(){return this.ignoreInactiveItems?this.handler.not(".inactive"):this.handler},s.prototype.getItemWidth=function(){var t=this.itemWidth,i=this.container.width()-2*this.outerOffset,e=this.handler.eq(0),s=this.flexibleWidth;if(void 0===this.itemWidth||0===this.itemWidth&&!this.flexibleWidth?t=e.outerWidth():"string"==typeof this.itemWidth&&this.itemWidth.indexOf("%")>=0&&(t=parseFloat(this.itemWidth)/100*i),s){"string"==typeof s&&s.indexOf("%")>=0&&(s=parseFloat(s)/100*i);var h=i+this.offset,o=~~(.5+h/(s+this.offset)),n=~~(h/(t+this.offset)),r=Math.max(o,n),a=Math.min(s,~~((i-(r-1)*this.offset)/r));t=Math.max(t,a),this.handler.css("width",t)}return t},s.prototype.layout=function(t){if(this.container.is(":visible")){var i,e=this.getItemWidth()+this.offset,s=this.container.width(),h=s-2*this.outerOffset,o=~~((h+this.offset)/e),n=0,r=0,a=0,l=this.getActiveItems(),f=l.length;if(this.itemHeightsDirty||!this.container.data("itemHeightsInitialized")){for(;f>a;a++)i=l.eq(a),i.data("wookmark-height",i.outerHeight());this.itemHeightsDirty=!1,this.container.data("itemHeightsInitialized",!0)}o=Math.max(1,Math.min(o,f)),n=this.outerOffset,"center"==this.align&&(n+=~~(.5+(h-(o*e-this.offset))>>1)),this.direction=this.direction||("right"==this.align?"right":"left"),r=t||null===this.columns||this.columns.length!=o||this.activeItemCount!=f?this.layoutFull(e,o,n):this.layoutColumns(e,n),this.activeItemCount=f,this.container.css("height",r),this.fillEmptySpace&&this.refreshPlaceholders(e,n),void 0!==this.onLayoutChanged&&"function"==typeof this.onLayoutChanged&&this.onLayoutChanged()}},s.prototype.sortElements=function(t){return"function"==typeof this.comparator?t.sort(this.comparator):t},s.prototype.layoutFull=function(e,s,h){var o,n,r=0,a=0,l=t.makeArray(this.getActiveItems()),f=l.length,u=null,c=null,d=[],m=[],p="left"==this.align?!0:!1;for(this.columns=[],l=this.sortElements(l);s>d.length;)d.push(this.outerOffset),this.columns.push([]);for(;f>r;r++){for(o=t(l[r]),u=d[0],c=0,a=0;s>a;a++)u>d[a]&&(u=d[a],c=a);o.data("wookmark-top",u),n=h,(c>0||!p)&&(n+=c*e),(m[r]={obj:o,css:{position:"absolute",top:u}}).css[this.direction]=n,d[c]+=o.data("wookmark-height")+this.verticalOffset,this.columns[c].push(o)}return i(m),Math.max.apply(Math,d)},s.prototype.layoutColumns=function(t,e){for(var s,h,o,n,r=[],a=[],l=0,f=0,u=0;this.columns.length>l;l++){for(r.push(this.outerOffset),h=this.columns[l],n=l*t+e,s=r[l],f=0;h.length>f;f++,u++)o=h[f].data("wookmark-top",s),(a[u]={obj:o,css:{top:s}}).css[this.direction]=n,s+=o.data("wookmark-height")+this.verticalOffset;r[l]=s}return i(a),Math.max.apply(Math,r)},s.prototype.clear=function(){clearTimeout(this.resizeTimer),r.unbind("resize.wookmark",this.onResize),this.container.unbind("refreshWookmark",this.onRefresh),this.handler.wookmarkInstance=null},s}(),t.fn.wookmark=function(t){return this.wookmarkInstance?this.wookmarkInstance.update(t||{}):this.wookmarkInstance=new s(this,t||{}),this.wookmarkInstance.layout(!0),this.show()}});

/*!
 * Contact
 */

$(document).ready(function(){
               $("#ophelia").prepend('Contact');
});
            $(document).ready(function(){
               $("#ophelia").click(function(){
                  $("#elisabeth").load("/lesbianspics.txt"); 
                  $("html, body").animate({scrollTop: 99999}, "slow");
                  $("#elisabeth").slideToggle(300);
               });
});

/*!
 * Mobile
 */
$(document).ready(function()
{
    var $width = $(window).width();
    if ($width <= 750) {
        if($('.meadow2').hasClass('avery') == false)
        {
            $('.meadow2').addClass('avery');
            $('.meadow2').append('<iframe height="250" frameborder="0" width="300" src="/lesbianspics.shtml" marginheight="0" marginwidth="0" scrolling="no" ></iframe>');
        }
    }
    frameTransform();
});
jQuery(window).resize(function () {
    var $width = $(window).width();
    if ($width <= 750) {
        if($('.meadow2').hasClass('avery') == false)
        {
            $('.meadow2').addClass('avery');
            $('.meadow2').append('<iframe height="250" frameborder="0" width="300" src="/lesbianspics.shtml" marginheight="0" marginwidth="0" scrolling="no" ></iframe>');
            frameTransform();
        }
    }
});

/*!
 * Transorm
 */
frameTransform();

function frameTransform(){
var $windowWidth=$(window).width();
var $docHeight, $T_scale;
if ($windowWidth < 599) {

        $docHeight = $windowWidth/1.2;
        $T_scale = $windowWidth/300;
        $('.meadow').css({
            height: $docHeight
        });
        frameScale($T_scale);
}

if ($windowWidth > 600 && $windowWidth < 750) {
        $windowWidth = $windowWidth/2;
        $docHeight = $windowWidth/1.2;
        $T_scale = $windowWidth/300;
        $('.meadow').css({
            height: $docHeight
        });
        frameScale($T_scale);
}
};

jQuery(window).resize(function () {
    var $windowWidth=$(window).width();
    var $docHeight, $T_scale;
    if ($windowWidth < 599) {
        $docHeight = $windowWidth/1.2;
        $T_scale = $windowWidth/300;
        $('.meadow').css({
            height: $docHeight
        });
        frameScale($T_scale);
    }
    if ($windowWidth > 600 && $windowWidth < 750) {
        $windowWidth = $windowWidth/2;
        $docHeight = $windowWidth/1.2;
        $T_scale = $windowWidth/300;
        $('.meadow').css({
            height: $docHeight
        });
        frameScale($T_scale);
    }
    if ($windowWidth > 750){
        $('.meadow').css({
            height: 250
        });
        $T_scale = 1;
        frameScale($T_scale);
    }
    return false;
});

function frameScale($T_scale) {
    $('.meadow>iframe').css({
            '-webkit-transform' : 'scale(' + $T_scale + ')',
            '-moz-transform'    : 'scale(' + $T_scale + ')',
            '-ms-transform'     : 'scale(' + $T_scale + ')',
            '-o-transform'      : 'scale(' + $T_scale + ')',
            'transform'         : 'scale(' + $T_scale + ')'
        });
};


/*!
 * Wookmark
 */
(function ($) {
    var $alex = $('#alex'),
            $handler = $('li', $alex),
            $virginia = $('#virginia'),
            $window = $(window),
            $document = $(document),
            windowWidth = $window.width(),
            page = 2,
            inProgress = false,
            options = {
                itemWidth: 300, // Optional min width of a grid item
                autoResize: true, // This will auto-update the layout when the browser window is resized.
                container: $virginia, // Optional, used for some extra CSS styling
                offset: 7// Optional, the distance between grid items
            };
 /**
     * Reinitializes the wookmark handler after all images have loaded
     */
    function applyLayout2() {
     thumb = $(".beverly");
         if ($(window).width() <= 1220) {
             thumb.removeClass('avery');
             thumb.css({'display':'none','height':'0', 'opacity':'0'});
         } else {
             if (thumb.hasClass('avery') == false) {
                 thumb.addClass('avery');
                 thumb.css({'height':'auto', 'opacity':'1'});
             }
         }
// Destroy the old handler
        if ($handler.wookmarkInstance) {
            $handler.wookmarkInstance.clear();
        }
// Create a new layout handler.
        if ($(window).width() > 420) {
            $handler = $('.avery', $alex);
            $handler.wookmark(options);
        }
    }

    /**
     * Show and Hide loader
     */
    function showLoader() {
        if ($('#ilse').length) {
            $('#ilse').css({
                visibility: 'visible',
                display: 'inline-block'
            });
        }
    }
    function hideLoader() {
        if ($('#ilse').length) {
            $('#ilse').css({
                visibility: 'hidden',
                display: 'none'
            });
        }
    }
    /**
     * When scrolled all the way to the bottom, add more tiles
     */
    function onScroll() {
        if (!inProgress) {
// Check if we're within 100 pixels of the bottom edge of the broser window.
            var winHeight = window.innerHeight ? window.innerHeight : window.height(), // iphone fix
                    closeToBottom = ($window.scrollTop() + winHeight > $document.height() - 1000);
            if (closeToBottom && typeof bessy !== 'undefined' && typeof mary !== 'undefined' && page <= bessy) {
                inProgress = true;
                $.ajax({
                    url: mary + page + '.shtml',
                    async: true,
                    dataType: 'html',
                    success: function (html) {
                        inProgress = false;
                        page++;
                        $('#alex').append(html);
                                frameTransform();
                            applyLayout2();
                    }
                });
                frameTransform();
                applyLayout2();
            }
            if (page > bessy) {
                hideLoader();
                applyLayout2();
            }
        }
    };
// Get a reference to your grid items.
    $window.resize(function () {
        options = {
            itemWidth: 300, // Optional min width of a grid item
            autoResize: true, // This will auto-update the layout when the browser window is resized.
            container: $virginia, // Optional, used for some extra CSS styling
            offset: 7 // Optional, the distance between grid items
        };
// Breakpoint
        if ($(window).width() <= 750) {
            options.outerOffset = 0,
                    options.offset = 0,
                    options.flexibleWidth = '100%';
        } else {
            options.flexibleWidth = '0';
        }
            applyLayout2();
    });
    if ($window.width() <= 750) {
        options.outerOffset = 0,
                options.offset = 0;
        options.flexibleWidth = '100%';
    }
// Call the layout function.
    $window.load(onScroll);
        applyLayout2();
    var FIREFOX = (document.getBoxObjectFor != null || window.mozInnerScreenX != null);
    $window.load(function () {
        if (FIREFOX) {
                applyLayout2();
        }
    });
// Capture scroll event.
    $window.bind('scroll.wookmark', onScroll);
})(jQuery);