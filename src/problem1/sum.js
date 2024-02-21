// ASSUMPTIONS: 
// (Given in question) Assuming this input will always produce a result lesser than Number.MAX_SAFE_INTEGER.
// The inputs passed to each function are natural numbers (integers from 0 onwards).

// iterative O(n) using a for loop
var sum_to_n_a = function(n) {
    let sum = 0;
    for (i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// recursive O(n)
var sum_to_n_b = function(n) {
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_b(n - 1);
};

// iterative solution using recursion O(n)
var sum_to_n_c = function(n) {
    function helper(n, result) {
        if (n === 0) {
            return result;
        }
        return helper(n - 1, result + n);
    }
    return helper(n, 0);
};