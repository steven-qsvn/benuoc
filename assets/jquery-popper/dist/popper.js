(function ($) {
    var ANIMATION_DURATION = 150;

    function Popper(element) {
        this.element = $(element);
        this.primary = this.element.find('[data-primary]');
        this.poppers = this.element.find('a:not([data-primary])');

        this.primary.on('click', this.primaryClicked.bind(this));
        this.element.addClass('popper-container');
        this.poppers.addClass('secondary');
        this.primary.addClass('primary');
        this.hidePoppers(true);
    }

    Popper.prototype.getPoppersStartingPosition = function () {
        return {
            left: Math.abs(this.primary.position().left + (this.primary.width() / 2)),
            top: Math.abs(this.primary.position().top + (this.primary.height() / 2))
        };
    };

    Popper.prototype.hidePoppers = function (noAnimation) {
        var position = this.getPoppersStartingPosition();
        if (noAnimation) {
            this.poppers.each(function () {
                $(this).css({
                    left: position.left - ($(this).width() / 2),
                    top: position.top - ($(this).height() / 2)
                });
            });
        } else {
            this.poppers.each(function (index) {
                $(this).stop().delay(index * (ANIMATION_DURATION / 3)).animate({
                    left: position.left - ($(this).width() / 2),
                    top: position.top - ($(this).width() / 2)
                }, {
                    duration: ANIMATION_DURATION * 3,
                    easing: 'easeInBack'
                });
            });
        }
        this.element.removeClass('popped');
    };

    Popper.prototype.showPoppers = function () {
        this.element.addClass('popped');
        this.poppers.show();
        this.positionPoppers();
        this.primary.text('Chạy !');
    };

    Popper.prototype.positionPoppers = function () {
        var radius = 200,
                angle = 0,
                step = (2 * Math.PI) / this.poppers.length;

        var position = this.getPoppersStartingPosition(),
                elementW = this.element.width(),
                elementH = this.element.height();
        this.poppers.each(function (index) {
            var width = $(this).width(),
                    height = $(this).height(),
                    deltaWidth = (elementW / 2) - ($(this).width() / 2),
                    deltaHeight = (elementH / 2) - ($(this).height() / 2),
                    x = Math.round(width + radius * Math.cos(angle) - deltaWidth / 2),
                    y = Math.round(height + radius * Math.sin(angle) - deltaHeight / 2);


            $(this).delay(index * (ANIMATION_DURATION / 3)).animate({
                left: x + 'px',
                top: y + 'px'
            }, {
                duration: ANIMATION_DURATION,
                easing: 'easeOutBack'
            });
            angle += step;
        });
    };

    Popper.prototype.primaryClicked = function () {
        if (this.element.hasClass('popped')) {
//      this.hidePoppers();
            $.ajax({
                url: 'ajax.php',
                dataType: 'json',
                complete: function (response) {
                    var data = response.responseJSON.data;
                    $.data(document.body, 'serverRandomKey', data.key);
                }
            });

            var firstInterval = setInterval(function () {
                // Randomize a value to end this interval from 5 to 9
                var firstRandomEndInterval = Math.floor((Math.random() * 5) + 5);
                var intervalRunTimes = $.runInterval();
                if (intervalRunTimes !== undefined && (intervalRunTimes === firstRandomEndInterval || intervalRunTimes > 9)) {
                    clearInterval(firstInterval);
                    $.data(document.body, 'intervalRunTimes', 0);
                    
                    // Start a new interval
                    var secondInterval = setInterval(function () {
                        // Randomize a value to end this interval from 20 to 24
                        var secondRandomEndInterval = Math.floor((Math.random() * 5) + 20);
                        intervalRunTimes = $.runInterval();
                        if (intervalRunTimes !== undefined && (intervalRunTimes === secondRandomEndInterval || intervalRunTimes > 24)) {
                            clearInterval(secondInterval);
                            $.data(document.body, 'intervalRunTimes', 0);
                            
                            var thirdInterval = setInterval(function () {
                                // Randomize a value to end this interval from 10 to 14
                                var thirdRandomEndInterval = Math.floor((Math.random() * 5) + 10);
                                intervalRunTimes = $.runInterval();
                                if (intervalRunTimes !== undefined && (intervalRunTimes === thirdRandomEndInterval || intervalRunTimes > 14)) {
                                    clearInterval(thirdInterval);
                                    $.data(document.body, 'intervalRunTimes', 0);
                                    
                                    var fourthInterval = setInterval(function () {
                                        // Randomize a value to end this interval from 10 to 14
                                        var fourthRandomEndInterval = Math.floor((Math.random() * 5) + 5);
                                        intervalRunTimes = $.runInterval();
                                        if (intervalRunTimes !== undefined && (intervalRunTimes === fourthRandomEndInterval || intervalRunTimes > 9)) {
                                            clearInterval(fourthInterval);
                                            $.data(document.body, 'intervalRunTimes', 0);
                                            
                                            // End everything here
                                            var serverRandomKey = $.data(document.body, 'serverRandomKey');
                                            console.log(serverRandomKey);
                                            setTimeout(function() {
                                                $('.secondary').css('opacity', 1);
                                                $('.secondary').eq(serverRandomKey).css('opacity', 0.5).find('img').css('border-color', 'red');
                                            }, 1000);
                                        }

                                    }, 600);
                                }

                            }, 300);
                        }
                        
                    }, 100);
                }
            }, 500);
        } else {
            this.showPoppers();
        }
    };

    $.runInterval = function () {
        var intervalRunTimes = $.data(document.body, 'intervalRunTimes');
        // Randomize a key in the list 
        var randomKey = Math.floor((Math.random() * 12));
        
        $('.secondary').css('opacity', 1).find('img').css('border-color', '#4F5B93');
        $('.secondary').eq(randomKey).css('opacity', 0.5).find('img').css('border-color', 'red');
        // Initialize the run times of this interval
        if (intervalRunTimes === undefined) {
            intervalRunTimes = 0;
        }

        $.data(document.body, 'intervalRunTimes', intervalRunTimes + 1);
        
        return intervalRunTimes;
    };
    
    $.fn.popper = function (options) {
        return this.each(function () {
            var popper = new Popper(this);
            $(this).attr('popper', popper);
        });
    };
})(jQuery);
