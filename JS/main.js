!function(){
  let result = `/* 
大家好，我是文聪
下面
我将以动画的形式来介绍我自己
呃。。。
只用文字介绍似乎有点太单调了
那加一点代码吧

首先,给所有html元素加上过渡效果，方便观看
*/
*{
  transition: all 1s;
}
/*白色背景太耀眼，换个色吧*/
body{
  background:#EDEDED;
}
#styleCode{
  background:#303030;
}
/*哇，字怎么看不清了，换个色吧
同时把代码高亮一下
*/
body,.token.comment{
  color:#ddd;
}
.token.selector{
  color:#E49E0F;
}
.token.property{
  color:#64D4E9;
}
.token.punctuation{
  color:#D0D80A;
}
.token.function{
  color:#B07CDF;
}
/*啧啧，文字离边框太近了吧
再加个右边距吧
*/
#styleCode{
  border:3px solid #CCCCCC;
  padding:16px;
  overflow:auto;
}
/*再加点酷炫3D的效果看看*/
html{
  perspective:800px;
}
#styleCode{
  position:fixed;left:0;top:0;
  transform: translate3d(0px, 0px, -90.5px) rotateX(0deg) rotateY(10deg);
}

/*好了，不玩了，直接在右侧建立一个简历显示屏吧*/
#resumeScreen{
  position:fixed;right:0;top:0;
  border:3px solid #CCCCCC;
  background:white;
  color:black;
}
/*接下来就在右边屏幕显示简历了*/

`
let result2 = `
/*
这个markdown格式似乎不太好看
那我们把它们转成HTML格式的吧
*/
  `
let md = `# 自我介绍
我英文名叫Logan
西安理工大学毕业
在饥人谷自学前端半年
希望应聘前端开发岗位

# 技能介绍
* 前端开发
* 熟悉Javascript html+CSS
* 熟悉ajax、JSONP
* 能熟练运用前端jQuery库
* 了解MVC代码组织方式

# 项目介绍
1. [自制导航栏](https://wenconglan.github.io/myBookmarks/myBookMarks.html)
2. [canvas画板](https://wenconglan.github.io/canvas-demo/1.html)
3. [个人简历网页版](https://wenconglan.github.io/resume/)

# 联系方式
* qq：331089420
* Email： yalaer_and_one@163.com
* 手机：13510515134
`
let result3= `
/*字有点小，变大点*/
#resumeScreen{
  font-size: 24px;
}
/*再变更下样式*/
#resumeScreen ul>li::before{
  content: '•';
  margin-right: 0.5em;
}

/*这就是我的会动的简历了，谢谢观看*/

`
writeCode('', result, () => {
  createPaper(()=>{
    writeMarkdown(md,()=>{
      writeCode(result,result2,()=>{
        markdownToHTML(()=>{
          writeCode(result+result2,result3,()=>{})
        })
      })
    })
  })
})
var showSpeed = 50
$('.actions').on('click','button',function(e){
  let $button = $(e.currentTarget)
  let speed = $button.attr('data-speed')
  $button.addClass('active')
    .siblings('.active').removeClass('active')
    switch(speed){
      case 'slow':
      showSpeed = 100
      break;
      case 'normal':
      showSpeed = 50
      break
      case 'fast':
      showSpeed = 10
      break
    }
})

function createPaper(fn) {
  let resumeScreen = document.createElement('div')
  resumeScreen.id = 'resumeScreen'
  let content = document.createElement('pre')
  content.className = 'content'
  document.body.appendChild(resumeScreen)
  resumeScreen.appendChild(content)
  fn.call()
}

function writeMarkdown(markdown,fn1){
  let domPaper = document.querySelector('#resumeScreen>.content')
  let n = 0
  let timerId = setTimeout(function fn() {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n < markdown.length) {
      timerId = setTimeout(fn, showSpeed)
    } else {
      fn1 && fn1.call()
    }
  }, showSpeed)
}

function markdownToHTML(fn){
  let domPaper = document.querySelector('#resumeScreen>.content')
  domPaper.innerHTML= marked(domPaper.innerHTML)
  fn.call()
}
//设定函数，把code写入styleTag标签中
function writeCode(prefix, code, fn1) {
  let domCode = document.querySelector('#styleCode')
  domCode.innerHTML = prefix || ''
  let domStyle = document.querySelector('#styleTag')
  let n = 0
  let timerId = setTimeout(function fn() {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n),Prism.languages.css )
    domCode.scrollTop = domCode.scrollHeight
    domStyle.innerHTML = prefix + code.substring(0, n)
    if (n < code.length) {
      timerId = setTimeout(fn, showSpeed)
    } else {
      fn1 && fn1.call()
    }
  }, showSpeed)
}
}.call()

