$( document ).ready(function() {
    var Hangman = {
        hangman_photos : [
            "assets/images/Hangman1.jpg",
            "assets/images/Hangman2.jpg",
            "assets/images/Hangman3.jpg",
            "assets/images/Hangman4.jpg",
            "assets/images/Hangman5.jpg",
            "assets/images/Hangman6.jpg",
            "assets/images/Hangman7.jpg",
            "assets/images/Hangman.jpg",
        ],
        hangmanWord : "Hello",
        letterQueue : [],
        missQueue : [],
        maxAttempts : 7,
        isDisabledKeys : false,
        start : function() {
            $('#YouWinMessage').addClass('hidden');
            $("#HangmanMessage").addClass('hidden');
            $("#GamePrompt").removeClass('hidden');
            this.isDisabledKeys = false;
            this.missQueue = [];
            this.letterQueue = this.hangmanWord.toLowerCase().split('').map((c, i) => { return { val : c, index : i, isMatch : false}});
            console.log(this.letterQueue);
            $("#hangman").attr('src', this.hangman_photos[0]);
            $('#letters').empty();
            this.updateUI();
        },
        restart : function() {
            console.log('Restarting...');
            this.start();
        },
        appendMiss : function(letter) {
            this.missQueue.push(letter);
            this.updateUI();
        },
        appendFound : function(letter, index) {
            this.letterQueue.forEach(i => i.index == index ? i.isMatch = true : null);
            this.updateUI();
        },
        updateUI : function() {
            var missLength = this.missQueue.length;
            if (missLength == 0) {
                $("#hangman").attr('src', this.hangman_photos[0]);
            } else {
                console.log(this.hangman_photos[missLength]);
                $("#hangman").attr('src', this.hangman_photos[missLength]);
            }

            var letterQueueCount = 0;
            this.letterQueue.forEach(x => x.isMatch ? ++letterQueueCount : null);
            if (missLength == this.maxAttempts) {
                this.isDisabledKeys = true;
                this.displayHangmanMessage();
            } else if(letterQueueCount == this.letterQueue.length) {
                this.isDisabledKeys = true;
                this.displayYouWonMessage();
            }

            $('#letters').empty();
            this.letterQueue.forEach(x => x.isMatch ? $('#letters').append('<span class="letter">' + x.val +'</span>') : $('#letters').append('<span class="letter">_</span>'));
        },
        findLetter : function(letter) {
            if (!this.isDisabledKeys) {
                console.log(letter);
                var idx = this.letterQueue.findIndex(x => x.val == letter && x.isMatch == false);
                idx == -1 ? this.appendMiss(letter) : this.appendFound(letter, idx);
            }
        },
        displayHangmanMessage : function() {
            $("#HangmanMessage").removeClass('hidden');
            $("#GamePrompt").addClass('hidden');
            $('#YouWinMessage').addClass('hidden');
        },
        displayYouWonMessage : function() {
            $("#HangmanMessage").addClass('hidden');
            $("#GamePrompt").addClass('hidden');
            $('#YouWinMessage').removeClass('hidden');
        }
    };

    $('#restart').on('click', function(e) {
        Hangman.restart();      
    });

    $('#RestartButton, #RestartButton2').on('click', function(e) {
        Hangman.restart(); 
    });

    $('body').on('keyup', function(e) {
        Hangman.findLetter(e.key.toLowerCase());
    });

    Hangman.start();
});