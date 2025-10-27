// 1. グローバル変数の定義と初期化
const TODO_APP_TASKS_KEY = "TODO_APP_TASKS";

// Cookieから読み込んだデータを格納する配列。letで宣言し、後で内容を更新できるようにする
let tasks = []; 

const checkTodo = document.getElementById("checkTodo");
const checkToday = document.getElementById("checkToday");
const addButton = document.getElementById("addButton");
const todoTable = document.getElementById("todoTable");
const todayTable = document.getElementById("todayTable");

// =================================================================
// 2. Cookieとデータ管理関数
// =================================================================

// 配列データをJSON化し、Cookieに保存する
function saveTasks() {
    // データをJSON文字列に変換
    const tasksJson = JSON.stringify(tasks); 
    
    // Cookieに保存 (30日有効として設定)
    // cvalue には JSON文字列が渡される
    setCookie(TODO_APP_TASKS_KEY, tasksJson, 30);
}

// Cookieに保存された文字列を安全にエンコードして書き込む
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();

    // cvalue（JSON文字列）をエンコード
    const encodedValue = encodeURIComponent(cvalue); 

    document.cookie = cname + "=" + encodedValue + ";" + expires + ";path=/";
}

// Cookieの読み込み (Cookieから値を取得し、JSONをパースして配列を返す)
function getCookie() {
    const name = TODO_APP_TASKS_KEY + "=";
    // Cookie文字列全体を取得し、デコードする
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            const jsonString = c.substring(name.length, c.length);
            // JSONをパースし、失敗したら空配列を返す
            try {
                return JSON.parse(jsonString);
            } catch (e) {
                console.error("Failed to parse tasks JSON from cookie:", e);
                return [];
            }
        }
    }
    return []; // Cookieが存在しない場合は空配列を返す
}

// Cookieの削除 (有効期限を過去にして上書き)
function deleteCookie(cname) {
    // 期限を0日または過去の日付に設定して上書きすることで削除
    setCookie(cname, "", 0); 
}


// =================================================================
// 3. 描画関数 (画面への表示を制御する)
// =================================================================

// tasks配列の内容に基づき、テーブルのDOMを再構築する
function renderTasks() {
    // 既存のタスク行をクリアする（ヘッダー行は除く）
    // todoTableとtodayTableの2行目以降を全て削除
    while (todoTable.rows.length > 1) {
        todoTable.deleteRow(1);
    }
    while (todayTable.rows.length > 1) {
        todayTable.deleteRow(1);
    }
    
    // 1. HTMLに元々あったサンプル行（英語の勉強）を削除するための処理を追加
    //    HTMLファイル内の<tr>を削除するか、JavaScriptで処理します。
    //    今回は、HTMLのサンプル行を消して動作させる前提で進めます。
    
    // 2. tasks配列をループして、テーブルに行を追加
    tasks.forEach(task => {
        // どちらのテーブルに追加するかを判定
        const targetTable = task.type === 'todo' ? todoTable : todayTable;
        
        const newRow = targetTable.insertRow();
        newRow.dataset.taskId = task.id; // 削除のためにIDをDOMに持たせる
        
        // CKセル
        let newCell0 = newRow.insertCell();
        let check = document.createElement('input');
        check.type = 'checkbox';
        check.checked = task.isDone;
        newCell0.appendChild(check);
        
        // To do セル
        let newCell1 = newRow.insertCell();
        newCell1.textContent = task.content;
        
        // DL セル
        let newCell2 = newRow.insertCell();
        newCell2.textContent = task.deadline;
        
        // Deleteボタン
        let newCell3 = newRow.insertCell();
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'delete';
        deleteBtn.type = 'button';
        deleteBtn.addEventListener('click', deleteTask);
        newCell3.appendChild(deleteBtn);
    });
}


// =================================================================
// 4. メイン機能の修正（配列操作と保存処理を追加）
// =================================================================

// タスクを追加する関数
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const deadlineInput = document.getElementById("deadlineInput");

    const taskContent = taskInput.value.trim();
    const deadlineContent = deadlineInput.value.trim();
    
    // バリデーション
    if (!taskContent || !deadlineContent) {
        alert("タスク内容と期限を入力してください！");
        return;
    }

    // どちらの表に追加するか
    let taskType;
    if (checkTodo.checked && checkToday.checked || !checkTodo.checked && !checkToday.checked) {
        alert("Todo か Today の片方のみチェックしてください");
        return;
    } else if (checkTodo.checked) {
        taskType = "todo";
    } else {
        taskType = "today";
    }

    // 新しいタスクオブジェクトを生成
    const newTask = {
        // 現在のミリ秒をIDとして使用 (簡易的なユニークID)
        id: Date.now().toString(), 
        content: taskContent,
        deadline: deadlineContent,
        isDone: false, // 追加時は未完了
        type: taskType
    };

    // グローバル配列に追加
    tasks.push(newTask);

    // 配列の内容をCookieに保存
    saveTasks(); 
    
    // 画面を再描画して最新の状態を表示
    renderTasks();

    // フォームをクリア
    taskInput.value = '';
    deadlineInput.value = '';
}

// タスクを削除する関数
function deleteTask(event) {
    const clickedButton = event.target;
    const trElement = clickedButton.parentNode.parentNode;
    const taskIdToDelete = trElement.dataset.taskId; // ⭐ renderTasksで付けたIDを取得

    // 1. HTMLの行削除 (即時反映)
    const tableElement = trElement.parentNode;
    tableElement.removeChild(trElement);
    
    // 2. tasks配列から該当IDのタスクを削除
    tasks = tasks.filter(task => task.id !== taskIdToDelete);

    // 3. 配列の内容をCookieに保存
    saveTasks();
}

// =================================================================
// 実行処理
// =================================================================

// ページ読み込み完了時：Cookieからデータを読み込み、画面に表示する
window.addEventListener('load', () => {
    // Cookieからデータを読み込み、tasks配列を初期化
    tasks = getCookie(); 
    
    // HTMLのサンプル行を削除することを推奨しますが、ここでは描画関数で対応します。
    // 読み込んだデータで画面を初期描画
    renderTasks();
});

addButton.addEventListener('click', addTask);