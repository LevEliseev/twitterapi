document.getElementById('tweetsFormBtn').addEventListener('click', (event) => {
    event.preventDefault();

    let tweetsForm = document.forms['tweetsForm'];
    let topic = tweetsForm.elements['topicName'].value;

    let tweet = JSON.stringify({topic: topic});
    let request = new XMLHttpRequest();

    request.open('POST', '/searchTweet', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(tweet);
    
    tweetsForm.reset();
});

let tweetCanvas = document.getElementById("tweetChart").getContext('2d');

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

let barChart = new Chart(tweetCanvas, {
    type: 'pie',
    data: {
        labels: ["Positive", "Negative"],
        datasets: [{
            label: "Tweets Sentiment",
            data: [59, 75],
            backgroundColor: ['#4453F7', '#F74444'],
            borderWidth: 2,
            borderColor: '#000'
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Tweets Sentiment',
            fontSize: 25
        },
        legend: {
            display: true
        }
    }
});

document.getElementById('chartFormBtn').addEventListener('click', (event) => {
    event.preventDefault();

    let chartForm = document.forms['chartForm'];
    let text = chartForm.elements['chartTopicName'].value;

    let getData = JSON.stringify({text: text});
    let request = new XMLHttpRequest();

    request.open('POST', '/getData', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', () => {
        let receivedData = JSON.parse(request.response);
        console.log(receivedData.text);
    });
    request.send(getData);
});