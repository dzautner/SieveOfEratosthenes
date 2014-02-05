/**
 * Sieve of Eratosthenes.
 *
 * From Wikipedia:
 
 	 In mathematics, the sieve of Eratosthenes (Greek: κόσκινον Ἐρατοσθένους), one of a number of prime number sieves, is a simple, ancient algorithm for finding all prime numbers up to any given limit. It does so by iteratively marking as composite (i.e. not prime) the multiples of each prime, starting with the multiples of 2.

 	 (http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)

 *
 * This script includes nice animations and a recursive implementation of the algorithm.
 */
var SieveOfEratosthenes = (function () {
	
	/**
	 * The constructor sets the attributes needed for the animations
	 * and the alogirthm to run correctly and than initialize both the algorithm 
	 * and the animations.
	 * it accepts two parameters: 
	 * 1) the top limit of the range two run the algorithm on
	 * 2) the container (in jQuery instance) in which to render the animation.
	 */
	function SieveOfEratosthenes(n, container) {
		this.n = n;
		this.container = container;
		this.result = this.start()

	}

	SieveOfEratosthenes.prototype = {

		/**
		 * Run the algorithem and initialize graphics.
		 */
		start: function () {
			var self = this;
			this.numbers = this.range(2, this.n);
			this.initializeGraphics();
			/**
			 * After the graphics are initialized we'll take a second before continuing.
			 * than we fire the algorithm and the animations that come with it.
			 * If not, the animation we'll be too rushed and look bad.
			 */
			
			setTimeout(function () {
				self.animateQueue();
			}, 501);
			return setTimeout(function () {
				self.run(self.numbers, 0)
			}, 500);
		},

		/**
		 * Recursivly create a range.
		 */
		range: function (start,end) {
			/**
			 * Edge case: if the start of the range end the end of the range
			 * are the same number, we should simply return the number.
			 */
			if (start == end) return end;
			/**
			 * Return the start concated with the range between the start + 1 and
			 * the end of the range.
			 */
			return [start].concat(this.range(start+1, end))
		},

		
		/**
		 * The actual Algorithm.
		 */
		run: function (range, p) {
			/**
			 * Every recursion step add the current range and prime to the animation queue.
			 */
			this.rangesToAnimateQueue.push([range, range[p]]);
			/**
			* Edge case: the prime we currently run on is bigger
			* than the root of the last number in the range. 
			* In this case we are done here and we can
			* return the range.
			*/
			if (range[p] > Math.sqrt( range[range.length-1] )) return range;
			/**
			 * Recur this function. this time without the multiples of the prime
			 * we currently run on and with the second paremeter set to the next 
			 * prime in the range.
			 */
			return this.run(range.filter(function (n) {
				return n == range[p] ||  n % range[p] != 0;
			}), p+1);
		},

		/**
		 * Print all of the numbers in the range nicely in the container.
		 */
		initializeGraphics: function () {
			var self = this;
			this.container.animate({opacity:0 }, function () {
				self.container.html(self.numbers.reduce(function (html, n) {
			 		html.append("<div class='n' data-number='"+n+"'>"+
			 						"<a target='_blank' href='http://en.wikipedia.org/wiki/"+n+"'>"+n+"</a>"+
			 					"</div>");
			 		return html;
				}, $('<div>')))
				$(this).animate({opacity: 1});
			});
		},

		/**
		 * Simple queue to hold ranges to animate 
		 * (We don't want animation to run simultaniously)
		 */
		rangesToAnimateQueue: [],

		animateQueue: function () {
			var self = this;
			/**
			 * If the queue is empty, it means we ran through it already and it's time
			 * to fire the finishing animation of removing gaps between numbers.
			 */
			if (this.rangesToAnimateQueue.length == 0) {
				return this.animateGapRemoval();	
			
			/**
			 * If the queue is not empty, take the first range in the queue
			 * and animate it with the makeTransparentIfNotIn and blinkNumber method.
			 * Then, wait 1000ms and fire this method again.
			 */
			} else {
				var toAnimate = this.rangesToAnimateQueue.shift();
				setTimeout( function () {
					self.blinkNumber(
						toAnimate[1]
					)
				}, 800);
				this.makeTransparentIfNotIn(
					toAnimate[0]
				);
				return setTimeout(function () {
					self.animateQueue();
				}, 1000);
			}
		},

		/**
		 * Make a number blink to indicate that it is the current prime used for filtering.
		 * After blinking, add "filtered" class to indicate multiples of this number
		 * were already filtered from the list.
		 */
		blinkNumber: function (n) {
			$('.blink').addClass('filtered').removeClass('blink')
			var nEl = $('[data-number="'+n+'"]');
			nEl.addClass('blink');

		},
		/**
		 * Make numbers which are not in the given range but are on the screen dissappear.
		 */
		 makeTransparentIfNotIn: function(primes) {
	 		/**
	 		 * Loop through all of the number elements on the dome.
	 		 */
			$('.n').each(function (idx, el) {
		 		/**
		 		 * If the number currently looped in the 'primes' array, add the 'hidden'
		 		 * class to the element;
		 		 */
				if ( primes.indexOf( $(el).attr("data-number")|0) == -1 ) {
					$(el).addClass('hidden');
				}
			})
 			

		 },

		 /**
		  * Animate the removel of the gaps between the primes number 
		  * that are left on the screen.
		  *
		  */
			
		  animateGapRemoval: function(delay) {  
		  	$('.blink').addClass('filtered').removeClass('blink');
		  	$('.n.hidden').addClass('done'); 
		  }

	}

	return SieveOfEratosthenes;

}());