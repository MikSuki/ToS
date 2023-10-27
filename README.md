# ToS

![ToS - video](https://github.com/MikSuki/ToS/assets/34766025/400c75a1-6e47-461e-84a3-aeb9533a4567)


DEMO: https://miksuki.github.io/ToS/

<br>

## 使用到的API： Event, Canvas, setInterval, Promise

- 等待讀檔
- 使用Canvas繪製畫面
- 滑鼠事件
- Promise控制消除符石的流程

<br>

## 判斷符石相連的方法 - Union-Find

1. 初始化，每個節點的parent都設為自己
2. 找出直的和橫的中，同屬性相連≥3顆的部分，並把他們的parent設為index最小值(最左上角)
3. 所有點和右邊及下面一個分別做判斷，如果兩者屬性相同且set大小都≥3，union兩者<br><br>
    需要合併的例子:
   
   0001<br>
   1000<br>
   0123<br>
    <br>和<br><br>
   1010<br>
   0021<br>
   0020<br>
   0112<br>
  <br> 兩個000都需要被合併在同一次消除之中
   
   
4. 最後找一次所有點的parent，就知道哪些點是在同一次消除中


