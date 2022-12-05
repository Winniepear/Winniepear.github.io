var dsc = document.getElementById("dsc");
var btn = document.getElementById("btn");
var box = document.getElementById("box");
box.style.visibility = "hidden";

// todo：进入页面开始计时，点击开始时记录阅读时间，点击“下载数据”视为浏览结束记录页面浏览时间,res用于接收最后返回的数据
var res = [];
var readStartTime = new Date().getTime();
console.log("阅读开始：" + readStartTime);
// 哈士棋看过来 目前仅支持10页记录，如果需要此处往后添加
var pdfRes = {
  page1: 0,
  page2: 0,
  page3: 0,
  page4: 0,
  page5: 0,
  page6: 0,
  page7: 0,
  page8: 0,
  page9: 0,
  page10: 0,
};

btn.addEventListener("click", function () {
  if (btn.innerHTML == "开始") {
    box.style.visibility = "visible";
    dsc.innerText = "提交问卷后请点击“下载数据”";
    btn.innerHTML = "下载数据";
    clearInterval(countPageSeconds);
    countReadTime();
  } else {
    countTotalTime();
    downloadCSV();
  }
});

function countReadTime() {
  var readEndTime = new Date().getTime();
  console.log("阅读结束：" + readStartTime);
  var readTime = readEndTime - readStartTime;
  console.log("阅读时间：" + readTime);
  res.push(readTime);
  console.log(res);
}

function countTotalTime() {
  var closeTime = new Date().getTime();
  console.log("关闭页面：" + closeTime);
  var totalTime = closeTime - readStartTime;
  console.log("页面停留时间:" + totalTime);
  res.push(totalTime);
  // 哈士棋看过来 目前仅支持10页记录，如果需要更多，相应在下面两个队列后面继续添加
  var {
    page1,
    page2,
    page3,
    page4,
    page5,
    page6,
    page7,
    page8,
    page9,
    page10,
  } = pdfRes;
  res.push(
    page1,
    page2,
    page3,
    page4,
    page5,
    page6,
    page7,
    page8,
    page9,
    page10
  );
  console.log(res);
}

function downloadCSV() {
  // 哈士棋看过来 目前仅支持10页记录，如果需要更多，这里也要相应添加
  var str = `阅读时间,页面总停留时间,p1停留,p2停留,p3停留,p4停留,p5停留,p6停留,p7停留,p8停留,p9停留,p10停留\n`;
  for (let i = 0; i < res.length; i++) {
    str += `${res[i] + "\t"},`;
  }
  const uri = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
  const link = document.createElement("a");
  link.href = uri;
  link.download = "数据2022.csv";
  link.click();
}

var countPageSeconds = setInterval(() => {
  var currentPage = JSON.parse(localStorage.getItem("pdfjs.history")).files[0]
    .page;
  switch (currentPage) {
    case 1:
      pdfRes.page1++;
      console.log(pdfRes);
      break;
    case 2:
      pdfRes.page2++;
      console.log(pdfRes);
      break;
    case 3:
      pdfRes.page3++;
      console.log(pdfRes);
      break;
    case 4:
      pdfRes.page4++;
      console.log(pdfRes);
      break;
    case 5:
      pdfRes.page5++;
      console.log(pdfRes);
      break;
    case 6:
      pdfRes.page6++;
      console.log(pdfRes);
      break;
    case 7:
      pdfRes.page7++;
      console.log(pdfRes);
      break;
    case 8:
      pdfRes.page8++;
      console.log(pdfRes);
      break;
    case 9:
      pdfRes.page9++;
      console.log(pdfRes);
      break;
    case 10:
      pdfRes.page10++;
      console.log(pdfRes);
      break;
  }
}, 1000);
