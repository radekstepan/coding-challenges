#[Odd Word Problem](http://c2.com/cgi/wiki?OddWordProblem)

Consider a character set consisting of letters, a space, and a point. Words consist of one or more, but at most 20 letters. An input text consists of one or more words separated from each other by one or more spaces and terminated by 0 or more spaces followed by a point. Input should be read from, and including, the first letter of the first word, up to and including the terminating point. The output text is to be produced such that successive words are separated by a single space with the last word being terminated by a single point. Odd words are copied in reverse order while even words are merely echoed. For example, the input string:

    whats the matter with kansas.

becomes:

    whats eht matter htiw kansas.

The problem is further restricted in that the characters must be read and printed one at a time.