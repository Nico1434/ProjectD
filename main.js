// 點擊輸入欄自動清空
const KEY = 'my-note';
const birthInput = document.getElementById('birthInput');
const display = document.getElementById('display');
const saveBtn = document.getElementById('save-btn');
// 第一次進來頁面時，先試著把舊資料拿出來
const saved = localStorage.getItem(KEY);
    if (saved) {
      birthInput.value = saved;
      display.textContent = '目前儲存的文字：' + saved;
 };

 
 //  document.addEventListener('DOMContentLoaded', () => {
  //const saveBtn = document.getElementById('save-btn');
  saveBtn.addEventListener('click', () => {
   
      const text = birthInput.value;
     
      localStorage.setItem(KEY, text);
      display.textContent = text
        ? '目前儲存的文字：' + text
        : '目前還沒有儲存任何文字。';
  });
//});



birthInput.addEventListener('focus', () => {
    birthInput.value = '';
    birthInput.placeholder = '';
    result.innerHTML = "";
});

birthInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // 阻止預設行為   
        calcAge();          // 呼叫計算函數
    }
});

function isValidDateFormat(str) {
    const regex = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
    if (!regex.test(str)) return false;
    const [y,m,d] = str.split("/").map(Number);
    const date = new Date(y, m-1, d);
    return date.getFullYear()===y && date.getMonth()===m-1 && date.getDate()===d;
}


    
// 打字動畫函數
function typeWriter(textLines, element, index=0) {
    if(index >= textLines.length) return;
    let line = textLines[index];
    let i = 0;
    element.innerHTML += '<p></p>';
    let p = element.querySelectorAll('p')[index];
    function typeChar() {
        if(i<line.length){
            p.innerHTML += line.charAt(i);
            i++;
            setTimeout(typeChar, 50); // 打字速度(ms)
        } else {
            typeWriter(textLines, element, index+1); // 打下一行
        }
    }
    typeChar();
}

function calcAge() {
   
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    const input = birthInput.value.trim();
    const text = input;
    localStorage.setItem(KEY, text);
    display.textContent = text? '目前儲存的文字：' + text: '目前還沒有儲存任何文字。';

    if (!isValidDateFormat(input)) {
        resultDiv.innerHTML = `<p style="color:#ff4444;">❌ 生日格式錯誤，請輸入 YYYY/MM/DD，例如：1999/01/20</p>`;
        return;
    }

    const [y,m,d] = input.split("/").map(Number);
    const birthDate = new Date(y,m-1,d);
    const now = new Date();

    let ageYears = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    if(monthDiff<0||(monthDiff===0 && now.getDate()<birthDate.getDate())) ageYears--;

    if(ageYears<0){
        resultDiv.innerHTML = `<p style="color:#ff4444;">❌ 生日不能是未來日期</p>`;
        return;
    }

    const safeAge = ageYears<1?1:ageYears;
    const dogAge = Math.round(16*Math.log(safeAge)+31);

    const lines = [
        `👉 人類年齡：${ageYears} 歲`,
        `🐶 換算狗年齡：約 ${dogAge} 歲`
    ];

    typeWriter(lines, resultDiv);
}