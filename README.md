# Password Generator

## Description
### This website will generate a random password comprised of any combination of lowercase, uppercase, numbers or special characters. Password length is between 8 and 128 characters depending on user input.
#### Note this page uses checkboxes instead of confirm prompts in an effort to promote better coding practices and not cause problems in modern browsers. See: https://developers.google.com/web/updates/2017/03/dialogs-policy for more details.
## Limitations

### Method

Password generation occurs sequentially, starting with lowercase and adding uppercase, numbers and special characters in that order. Characters generated are passed to an array for processing. The password is then randomized using a Fisher-Yats shuffle, an unbiased randomization procedure. Passwords generated may initially have more characters than requested. Therefore, after randomization, the passwords will have excess charactrs trimmed from the end if needed.

Use of this method of password generation unfortunately creates some vulnerabilty. In general, because the algorthim loops over the control states repeatedly, all passwords will have roughly the same amount of character types. The resulting passwords will have a smaller sample space than a truly random method. Password cracking algorthims could in theory be tailored to take advantage of this. Note this only refers to brute force methods of guessing the correct password.  See Sample Space Analysis for more information and a specific case.

## Author Comments
Even in light of the potential vulnerability, created passwords are still sufficently randomized for use.  The algorithm produces enough passwords (length 8 containing lowercase, uppercase, numbers and special characters) for each person on earth to have ten unique passwords. As password length increases the compromised sample spaces rapidly grow to the point they are nearly as secure as a true random method. Finally the vulnerability is only exploitable with pre-knowledge which is unlikely in most cases. Simple put, don't just use a minimum length password and you'll be fine. You can check your password strength at the following website.  https://www.my1login.com/resources/password-strength-test/
 

## Recommended Fixes

* Rework Password Algorithm
* Removal of Math.random()
* Change Length Prompt

### Rework Password Algorithm
Reworking the algorithm provides the largest increase in password security. The algorthim could be reworked to only guarentee one of any type of charater. It could do this by looping through choice array once then using conditional statements to determine how to fill the rest of the array. 
Instead of using the ASCII table directly, arrays could be enumerated to hold potential characters.  Enumerated arrays of string literals could be used to create a new array that contains all legal values and selections are then made randomly from legal values. As there are only 15 possible combinations of valid choices this is realistic.

### Remove Math.random()
This algorthim is known to be psuedo random and removal will increase randomization. Use of window.crypto.getRandomValues() methods will produce random numbers which could be used to determine character choices. 

### Change Length Prompt
Currently the prompt appears using the window.prompt() method. This method will stop JavaScript from running on the page until an answer is given. Rework this to use HTML <dialog> to not intterupt code exection.

## Sample Space Analysis
The weakness of the generated passwords occurs when there are exactly the same number of each type of character. If this is known, the sample space any potential password decreases by at least an order of magnitude. Were passwords generated in a completely random manner, the sample space is simply the number of possible characters raised to the length of the password. The sample space of this algorthim would actually be the product of each type of character raised to the number of occurences in the string, 

Given a password of length 8 using all character types:
The sample space where all possible values are of equal chance is 76^8 approximately 1.11e15. The method used here will actually have 26^4 * 10^2 * 14^2 * 8 approximately 3.61e14 different combinations. This reduces the sample space by more than nearly two thirds. The effect of reduced sample space rapidly dimiminshes as password length increases. 

The following table shows the complete comparison of vulnerable sample spaces vs true random of passwords of various lengths where all characters are included in generation. 

| Length | letters | exponent | numerals | exponent2 | special chars | exponent3 | Sample Space | True Random | Sample Space2 |
| ------ | ------- | -------- | -------- | --------- | ------------- | --------- | ------------ | ----------- | ------------- |
| 8      | 26      | 4        | 10       | 2         | 14            | 2         | 3.61E+14     | 76          | 1.11E+15      |
| 12     | 26      | 6        | 10       | 4         | 14            | 4         | 4.78E+21     | 76          | 3.71E+22      |
| 16     | 26      | 8        | 10       | 6         | 14            | 6         | 6.34E+28     | 76          | 1.24E+30      |
| 20     | 26      | 10       | 10       | 8         | 14            | 8         | 8.40E+35     | 76          | 4.13E+37      |
| 24     | 26      | 12       | 10       | 10        | 14            | 10        | 1.11E+43     | 76          | 1.38E+45      |
| 28     | 26      | 14       | 10       | 12        | 14            | 12        | 1.47E+50     | 76          | 4.60E+52      |
| 32     | 26      | 16       | 10       | 14        | 14            | 14        | 1.95E+57     | 76          | 1.53E+60      |
| 36     | 26      | 18       | 10       | 16        | 14            | 16        | 2.59E+64     | 76          | 5.12E+67      |
| 40     | 26      | 20       | 10       | 18        | 14            | 18        | 3.43E+71     | 76          | 1.71E+75      |
| 44     | 26      | 22       | 10       | 20        | 14            | 20        | 4.54E+78     | 76          | 5.70E+82      |
| 48     | 26      | 24       | 10       | 22        | 14            | 22        | 6.02E+85     | 76          | 1.90E+90      |
| 52     | 26      | 26       | 10       | 24        | 14            | 24        | 7.98E+92     | 76          | 6.34E+97      |
| 56     | 26      | 28       | 10       | 26        | 14            | 26        | 1.06E+100    | 76          | 2.12E+105     |
| 60     | 26      | 30       | 10       | 28        | 14            | 28        | 1.40E+107    | 76          | 7.06E+112     |
| 64     | 26      | 32       | 10       | 30        | 14            | 30        | 1.86E+114    | 76          | 2.36E+120     |
| 68     | 26      | 34       | 10       | 32        | 14            | 32        | 2.46E+121    | 76          | 7.86E+127     |
| 72     | 26      | 36       | 10       | 34        | 14            | 34        | 3.26E+128    | 76          | 2.62E+135     |
| 76     | 26      | 38       | 10       | 36        | 14            | 36        | 4.32E+135    | 76          | 8.75E+142     |
| 80     | 26      | 40       | 10       | 38        | 14            | 38        | 5.72E+142    | 76          | 2.92E+150     |
| 84     | 26      | 42       | 10       | 40        | 14            | 40        | 7.58E+149    | 76          | 9.74E+157     |
| 88     | 26      | 44       | 10       | 42        | 14            | 42        | 1.00E+157    | 76          | 3.25E+165     |
| 92     | 26      | 46       | 10       | 44        | 14            | 44        | 1.33E+164    | 76          | 1.08E+173     |
| 96     | 26      | 48       | 10       | 46        | 14            | 46        | 1.76E+171    | 76          | 3.61E+180     |
| 100    | 26      | 50       | 10       | 48        | 14            | 48        | 2.34E+178    | 76          | 1.21E+188     |
| 104    | 26      | 52       | 10       | 50        | 14            | 50        | 3.09E+185    | 76          | 4.02E+195     |
| 108    | 26      | 54       | 10       | 52        | 14            | 52        | 4.10E+192    | 76          | 1.34E+203     |
| 112    | 26      | 56       | 10       | 54        | 14            | 54        | 5.43E+199    | 76          | 4.48E+210     |
| 116    | 26      | 58       | 10       | 56        | 14            | 56        | 7.20E+206    | 76          | 1.49E+218     |
| 120    | 26      | 60       | 10       | 58        | 14            | 58        | 9.54E+213    | 76          | 4.98E+225     |
| 124    | 26      | 62       | 10       | 60        | 14            | 60        | 1.26E+221    | 76          | 1.66E+233     |
| 128    | 26      | 64       | 10       | 62        | 14            | 62        | 1.67E+228    | 76          | 5.55E+240     |
