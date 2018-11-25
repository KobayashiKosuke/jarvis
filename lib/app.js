//LINE Developersで取得したアクセストークンを入れる
const CHANNEL_ACCESS_TOKEN = '0ucfReFhEVAKs9cVNobg7laB7t0M/tlTVxts7Erv8CJpqECgfBjcVFY9agS6rDLgYnwkKilrBYH53lORRFkTWHTpT0Z5zkzBkF9xcL3QrYI5+/zXa/2u95J72V9tEJP/6tymU5WHadBkNdNqrEl7/gdB04t89/1O/w1cDnyilFU=';
const line_endpoint = 'https://api.line.me/v2/bot/message/reply';

//ポストで送られてくるので、送られてきたJSONをパース
function doPost(e) {
  Logger.log(e.postData.contents);
  var json = JSON.parse(e.postData.contents);

  //返信するためのトークン取得
  var reply_token = json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }

  //送られたメッセージ内容を取得
  let message = json.events[0].message.text;

  // メッセージを返信    
  UrlFetchApp.fetch(line_endpoint, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': message
      }]
    })
  });
  return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}