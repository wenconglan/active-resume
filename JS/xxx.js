let result = `/* 
大家好，我是文聪
下面
我将以动画的形式来介绍我自己
呃。。。
只用文字介绍似乎有点太单调了
那加一点代码吧

首先给所有html元素加上过渡效果，方便观看
*/
*{
  transition: all 1s;
}
/*白色背景太耀眼，换个色*/
body{
  background:#BDBDBD;
  font-size:12px;
}
#code{
  border:1px solid red;
  padding:16px;
}
/*再把代码高亮一下*/
.token.selector{
  color:#690;
}
.token.property{
  color:#905;
}
.token.function{
  color:#DD4A68;
}
/*加点3D效果吧*/
#code{
  transform:rotate(360deg)
}
/*不玩了，我来介绍一下我自己吧*/
/*我需要一张白纸*/
#code{
  position:fixed;
  left:0;
  width:50%;
  height:100%;
}
#paper{
  position:fixed;
  right:0;
  padding:16px;
  width:50%;
  height:100%;
  background:#ddd;
  display:flex;
  justify-content:center;
  align-items:center;
}
#paper > .content{
  background:white;
  height:100%;
  width:100%;
}
`
let result2 = `/*
  一张白纸*/
  /*接下来把Markdown变成HTML marked.js*/
/*接下来给HTML加样式*/
/*
这就是我的会动的简历了，谢谢观看
*/
  `
let md = `# 标题1
## 标题2
#### 标题3
`
writeCode('', result, () => {
  createPaper(() => {
    writeCode(result, result2,()=>{
      writeMarkdown(md)
    })
  })
})

function createPaper(fn) {
  let paper = document.createElement('div')
  paper.id = 'paper'
  let content = document.createElement('pre')
  content.className = 'content'
  document.body.appendChild(paper)
  paper.appendChild(content)
  fn.call()
}

function writeMarkdown(markdown,fn1){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let showSpeed = 0
  let timerId = setTimeout(function fn() {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n < markdown.length) {
      timerId = setTimeout(fn, showSpeed)
    } else {
      fn1.call()
    }
  }, showSpeed)
}

//设定函数，把code写入styleTag标签中
function writeCode(prefix, code, fn1) {
  let domCode = document.querySelector('#code')
  domCode.innerHTML = prefix || ''
  let domStyle = document.querySelector('#styleTag')
  let n = 0
  let showSpeed = 0
  let timerId = setTimeout(function fn() {
    n += 1
    domCode.innerHTML = Prism.highlight(
      prefix + code.substring(0, n),
      Prism.languages.css
    )
    domCode.scrollTop = domCode.scrollHeight
    domStyle.innerHTML = prefix + code.substring(0, n)
    if (n < code.length) {
      timerId = setTimeout(fn, showSpeed)
    } else {
      fn1.call()
    }
  }, showSpeed)
}



