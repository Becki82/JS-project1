const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

function showloading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    }
// Hide loading
function hideloading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// show new quote
function newQuote() {
    showloading();
    // pick arandon quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    // To check if author field is blank and replace it with "unkown"
    if (!quote.author) {
        authorText.textContent = "Unknown";
     } else {
        authorText.textContent = quote.author;
    }
// check quote length to determine styling
if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote')
}
// set quote, hide loader
    quoteText.textContent = quote.text;
    hideloading();
}




// get quotes from API
async function getQuotes() {
    showloading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert (error)
        // this is where you would handle the error, maybe in an alert as per example
    }
}
// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuotes();


