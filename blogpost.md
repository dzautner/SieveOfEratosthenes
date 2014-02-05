#Sieve of Eratosthenes

I love algorithms. 

I'm also pretty uneducated when it comes to math (at least not as educated as I'd like to be) 
so I decided to give it a go and try implementing few algorithms to refresh my knowledge of basic math and practice functional paradigmas, an interesting subject that gained a lot of buzz the last few years. 

The thing I love the most about alogrithms is that in more cases than not you can explain them through visualization to people who usually find math hard and confusing.

For my first "homework" I decided to take an algorithm I'm already familliar with, implement it using recursion and visualize it with nice graphics.
So I picked "Sieve of Eratosthenes".

Sieve of Eratosthenes is a pretty simple and straightforward algorithm used to find all of the prime number between 2 and a given number.
Wikipedia gives a nice description to the algorithm:

"""
##To find all the prime numbers less than or equal to a given integer n by Eratosthenes' method:

* Create a list of consecutive integers from 2 through n: (2, 3, 4, ..., n).

* Initially, let p equal 2, the first prime number.

* Starting from p, enumerate its multiples by counting to n in increments of p, and mark them in the list (these will be 2p, 3p, 4p, etc.; the p itself should not be marked).

* Find the first number greater than p in the list that is not marked. If there was no such number, stop. Otherwise, let p now equal this new number (which is the next prime), and repeat from step 3.
"""

So basically, we have a range of [2..n] and we need to walk through it and filter out all of the multiples of P, increasing P to the next item in the range until we run out of numbers to filter.

By the Wikipedia description you need to run the algorithm until you find the last prime number in the range, but it will actually be enough to run the algorithm until you reach the sqaure root of the last number in it.

The actual function was really easy to implement recursivly with JavaScript.
I created a function that accepts two parameters, a range to filter multiples from, and p, the index of range that hold the number we filter the multiples of. 

eratosthenes = function (range, p) {}

Next I defined the edge case, which is pretty clear here. 
We reach an edge case when p is bigger than the square root of the biggest number in the range - if that happenes, it means we finished filtering out multiples of primes and can return the range, which by now should contain nothing but primes.

The code looks like this:

eratosthenes = function (range, p) {

	if (p > Math.sqrt( range[range.length - 1] )) return range;

}

If we haven't reached the edge case, we should filter out all of the multiples of range[p] from range and run the function again, increasing p.
Note: we should not filter range[p] itself;

eratosthenes = function (range, p) {

	if (p > Math.sqrt( range[range.length - 1] )) return range;

	return eratosthenes(range.filter ( function (n) {
		return n == range[p] || n % range[p] != 0
	}), p++);
}

And... that's practically it. Pretty straight forward. 

I also included a wrapper function to be able to run eratosthenes(n) instead of having to run eratosthenes([2..n], 2) every single time. 

To make the whole code integrate nicer with the graphics I ended up writting one constructor function and attaching animation methods and the actual algorithm to the prototype.

You can see the full code with comments [here](https://github.com/dzautner/SieveOfEratosthenes).