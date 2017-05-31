(function ($) {
    // Constructor;

    var fixScrollLib = function (el, settings) {
        this.settings = settings;
        this.el = (el) ? $(el) : '.fix-item';
        this.elHeight = (this.el) ? $(this.el).outerHeight() : undefined;
        this.gapElSelector = '.' + this.gapClassName;
        this.getOffsetEl = this.el;
        this.offset = this.settings.offset;
        this.className = settings.className;
    };

    // Window Definition
    fixScrollLib.prototype.window =  $(window);
    fixScrollLib.prototype.gapClassName = 'gap';

    fixScrollLib.prototype.createGapHtml = function () {
        return '<div class="'+ this.gapClassName +'"></div>';
    };

    fixScrollLib.prototype.gapElHTML = fixScrollLib.prototype.createGapHtml();

    // Init Method
    fixScrollLib.prototype.init = function () {
        try {
            if(typeof this.el === 'object') {
                // if this.el are defined, we can execute the methods.
                this.wScroll();
                this.window.on('scroll', this.wScroll.bind(this));
            } else {
                // if this.el is undefined, we will get an error.
                throw 'Please make the definitions';
            }

            if(this.settings.onInit){
                this.settings.onInit.call(null,this.el);
            }

        } catch(err) {
            console.log(err);
        }
    };

    // Get Element's Position In The Document Method
    fixScrollLib.prototype.getElementOffset = function (obj) {
        return obj.offset().top + this.elHeight;
    };

    fixScrollLib.prototype.appendGap = function () {
        if(this.el.next(this.gapElSelector).length === 0) {
            this.el.after(this.gapElHTML);
        }
        this.el.next(this.gapElSelector).height(this.elHeight);
    };

    fixScrollLib.prototype.removeGap = function () {
        if(this.el.next(this.gapElSelector).length) {
            this.el.next(this.gapElSelector).remove();
        }
    };

    // Scroll Method
    fixScrollLib.prototype.wScroll = function () {

        if(this.getScrollTop() > this.getElementOffset(this.getOffsetEl) + this.offset){
            if(!this.el.hasClass(this.className)) {
                this.appendGap();
                this.el.addClass(this.className);
                this.getOffsetEl = this.el.next(this.gapElSelector);
            }
        } else {
            if(this.el.hasClass(this.className)) {
                this.removeGap();
                this.el.removeClass(this.className);
                this.getOffsetEl = this.el;
            }
        }

        if(this.settings.onScroll){
            this.settings.onScroll.call(null,this.el);
        }

    };

    // Get Window Scroll Top Method
    fixScrollLib.prototype.getScrollTop = function () {
        return this.window.scrollTop();
    };


    $.fn.fixScroll = function (options) {
        // Establish our default settings
        var settings = $.extend({
            offset: 0,
            className: 'fixed',
            onInit: $.noop,
            onScroll: $.noop
        }, options);

        return this.each( function() {
            var lib = new fixScrollLib(this, settings);
            lib.init();
        });
    };

}(jQuery));
