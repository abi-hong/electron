const { app, BrowserWindow } = require('electron')
// app : 애플리케이션 생명주기를 조작하는 모듈
// BrowserWindow : 네이티브 브라우저 창을 만드는 모듈

// 윈도우 객체를 전역에 유지. 이렇게 하지 않으면 JS의 GC가 일어날 때, 창이 멋대로 닫혀버림
let mainWindow

const createWindow = () => {
  // 새로운 브라우저 창 생성
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadFile('index.html') // index.html 로드
  mainWindow.webContents.openDevTools() // 개발자도구 열기

  // 창이 닫힐 때, 호출
  mainWindow.on('closed', () => {
    /* 
      윈도우 객체의 참조를 삭제.
      보통 멀티 윈도우 지원을 위해 윈도우 객체를 배열에 저장하는 경우가 있는데 
      이 경우 해당하는 모든 윈도우 객체의 참조를 삭제해주어야 함
    */
    mainWindow = null
  })
}

// electron의 초기화가 끝나면 실행되며 브라우저 윈도우를 생성할 수 있음
// 몇 API의 경우는 이 이벤트 이후에만 사용가능
app.on('ready', createWindow)

// 모든 창이 닫히면 애플리케이션 종료
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})