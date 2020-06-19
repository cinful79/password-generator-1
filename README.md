# Password Generator

## Description
### This website will generate a random password comprised of any combination of lowercase, uppercase, numbers or special characters. Password length is between 8 and 128 characters depending on user input.
#### Note this page uses checkboxes instead of confirm prompts in an effort to promote better coding practices and not cause problems in modern browsers. See: https://developers.google.com/web/updates/2017/03/dialogs-policy for more details.
## Limitations

### Method

Password generation occurs sequentially, starting with lowercase and adding uppercase, numbers and special characters in that order. Characters generated are passed to an array for processing. The password is then randomized using a Fisher-Yats shuffle, an unbiased randomization procedure. Passwords generated may initially have more characters than requested. Consequentially after randomization the passwords will have excess charactrs trimmed from the end.

Using this method of password generation unfortunately creates some vulnerabilty. Specifically, if it is known this algorthim generated a password and the characters requested with the desired length a bad actor could deduce a significant reduction in sample space.

Passwords where the length is evenly divisible by the number of requested character types will have equal amounts of all character types. The resulting passwords will have a smaller sample space than a truly random method. (See Sample Space Analysis)

In cases where the even divisiblity of the password length does not occur the resulting passwords will not have equal amounts of characters and the vulnerability is largely negated.  

## Author Comments
Even in light of the potential vulnerability, created passwords are still sufficently randomized for use. Furthermore as password length increases the compromised sample spaces rapidly grow to the point they are nearly as secure. Finally the vulnerability is only exploitable with pre-knowledge. 
 

## Recommended Fixes

* Rework Password Algorithm
* Removal of Math.random()
* Change Length Prompt

### Rework Password Algorithm
Reworking the algorithm provides the largest increase in password security. The algorthim could be reworked to only guarentee one of any type of charater. It could do this by looping through choice array once then using conditional statements to determine how to fill the rest of the array. 
Instead of using the ASCII table, arrays could be enumerated to hold potential characters. As there are only 15 possible combinations of valid choices this is realistic. Enumerated arrays of string literals could be used to create a new array that contains all legal values and selections made from legal values.

### Remove Math.random()
This algorthim is known to be psuedo random and removal will increase randomization. Use of window.crypto.getRandomValues() methods will produce random numbers which could be used to determine character choices. 

### Change Length Prompt
Currently the prompt appear using the window.prompt() method. This method will stop JavaScript from running on the page until an answer is given. Reworking this to use HTML <dialog> to not intterupt code exection.

## Sample Space Analysis
Given a password of length 8 using all character types:
The sample space where all possible values are of equal chance is 76^8 approximately 1.11e15. The method used here will actually have 26^4 * 10^2 * 14^2 approximately 8.96e9. This reduces the sample space by more than 99.9%. 

Comparitively, a password of length 8 using only lowercase letters will have a sample space of 2.08e11. The following table shows the complete comparison of vulnerable sample spaces vs true random of passwords of various lengths where all characters are included in generation. 


| Length | letters | exponent | numerals | exponent2 | special chars | exponent3 | Sample Space | True Random | Sample Space2 |
| ------ | ------- | -------- | -------- | --------- | ------------- | --------- | ------------ | ----------- | ------------- |
| 8      | 26      | 4        | 10       | 2         | 14            | 2         | 8.96E+09     | 76          | 1.11303E+15   |
| 12     | 26      | 6        | 10       | 4         | 14            | 4         | 1.19E+17     | 76          | 3.71333E+22   |
| 16     | 26      | 8        | 10       | 6         | 14            | 6         | 1.57E+24     | 76          | 1.23885E+30   |
| 20     | 26      | 10       | 10       | 8         | 14            | 8         | 2.08E+31     | 76          | 4.13306E+37   |
| 24     | 26      | 12       | 10       | 10        | 14            | 10        | 2.76E+38     | 76          | 1.37888E+45   |
| 28     | 26      | 14       | 10       | 12        | 14            | 12        | 3.66E+45     | 76          | 4.60024E+52   |
| 32     | 26      | 16       | 10       | 14        | 14            | 14        | 4.85E+52     | 76          | 1.53474E+60   |
| 36     | 26      | 18       | 10       | 16        | 14            | 16        | 6.42E+59     | 76          | 5.12023E+67   |
| 40     | 26      | 20       | 10       | 18        | 14            | 18        | 8.51E+66     | 76          | 1.70822E+75   |
| 44     | 26      | 22       | 10       | 20        | 14            | 20        | 1.13E+74     | 76          | 5.69899E+82   |
| 48     | 26      | 24       | 10       | 22        | 14            | 22        | 1.49E+81     | 76          | 1.90131E+90   |
| 52     | 26      | 26       | 10       | 24        | 14            | 24        | 1.98E+88     | 76          | 6.34318E+97   |
| 56     | 26      | 28       | 10       | 26        | 14            | 26        | 2.62E+95     | 76          | 2.1162E+105   |
| 60     | 26      | 30       | 10       | 28        | 14            | 28        | 3.47E+102    | 76          | 7.0602E+112   |
| 64     | 26      | 32       | 10       | 30        | 14            | 30        | 4.60E+109    | 76          | 2.3554E+120   |
| 68     | 26      | 34       | 10       | 32        | 14            | 32        | 6.10E+116    | 76          | 7.8582E+127   |
| 72     | 26      | 36       | 10       | 34        | 14            | 34        | 8.08E+123    | 76          | 2.6217E+135   |
| 76     | 26      | 38       | 10       | 36        | 14            | 36        | 1.07E+131    | 76          | 8.7465E+142   |
| 80     | 26      | 40       | 10       | 38        | 14            | 38        | 1.42E+138    | 76          | 2.918E+150    |
| 84     | 26      | 42       | 10       | 40        | 14            | 40        | 1.88E+145    | 76          | 9.7351E+157   |
| 88     | 26      | 44       | 10       | 42        | 14            | 42        | 2.49E+152    | 76          | 3.2479E+165   |
| 92     | 26      | 46       | 10       | 44        | 14            | 44        | 3.30E+159    | 76          | 1.0836E+173   |
| 96     | 26      | 48       | 10       | 46        | 14            | 46        | 4.37E+166    | 76          | 3.615E+180    |
| 100    | 26      | 50       | 10       | 48        | 14            | 48        | 5.79E+173    | 76          | 1.206E+188    |
| 104    | 26      | 52       | 10       | 50        | 14            | 50        | 7.67E+180    | 76          | 4.0236E+195   |
| 108    | 26      | 54       | 10       | 52        | 14            | 52        | 1.02E+188    | 76          | 1.3424E+203   |
| 112    | 26      | 56       | 10       | 54        | 14            | 54        | 1.35E+195    | 76          | 4.4784E+210   |
| 116    | 26      | 58       | 10       | 56        | 14            | 56        | 1.78E+202    | 76          | 1.4941E+218   |
| 120    | 26      | 60       | 10       | 58        | 14            | 58        | 2.36E+209    | 76          | 4.9846E+225   |
| 124    | 26      | 62       | 10       | 60        | 14            | 60        | 3.13E+216    | 76          | 1.663E+233    |
| 128    | 26      | 64       | 10       | 62        | 14            | 62        | 4.15E+223    | 76          | 5.548E+240    |
