```mermaid
flowchart LR
    LOGIN_G["GET /login<br/>ログインフォーム表示"] -->|ログイン| LOGIN_P["POST /login<br/>ログイン処理"]
    LOGIN_G --> |リダイレクト| REGISTER_G["GET /register<br/>新規ユーザー登録画面"]
    REGISTER_G --> |ユーザー登録| REGISTER_P["POST /register<br/>新規ユーザー登録"]
    REGISTER_P --> |ユーザー登録完了| LOGIN_G
    LOGIN_P --> |認証成功| TOP_G["GET /posts<br/>トップページ"]
    LOGIN_P --> |認証失敗| LOGIN_G
    TOP_G --> |リダイレクト| PROFILE_G["GET /profile<br/>ユーザー情報表示画面"]
    PROFILE_G --> |編集| PROFILE_EDIT_G["GET /profile/edit<br/>個別ユーザー情報更新画面"]
    PROFILE_EDIT_G --> PROFILE_PU["PUT /profile<br/>個別ユーザー情報更新"]
    PROFILE_G --> |削除| PROFILE_D["DELETE /profile<br/>個別ユーザー情報削除"]
    PROFILE_PU --> |リダイレクト| PROFILE_G
    PROFILE_D --> |リダイレクト| PROFILE_G
    TOP_G --> |リダイレクト| POST_REGISTER_C["GET /posts/create<br/>イベント情報新規登録画面"]
    POST_REGISTER_C --> |登録| POST_P["POST /posts<br/>イベント情報登録"]
    TOP_G --> |リダイレクト|POST_EDIT_G["GET /posts/{id}/edit<br/>イベント情報更新画面"]
    POST_EDIT_G--> |更新| POST_EDIT_PU["PUT /posts/{id}<br/>イベント情報更新"]
    TOP_G -->　|キャンセル| POST_CANCEL_P["POST  /posts/{id}/cancel<br/>イベント情報キャンセル"]
    POST_P --> |メール送信| TOP_G
    POST_EDIT_PU --> |メール送信| TOP_G
    POST_CANCEL_P --> |キャンセルメール| TOP_G
    TOP_G --> |予約作成|　POST_RESERVE_POST["POST /posts/{id}/reserve<br/>イベントへ予約作成"]
    POST_RESERVE_POST --> |予約不可または完了時メール送信|TOP_G
    TOP_G --> |予約キャンセル| POST_RESERVE_D["DELETE /posts/{id}/reserve<br/>イベント予約キャンセル"]
    POST_RESERVE_D　--> |メール送信| TOP_G
    TOP_G --> |ログアウト|LOGOUT_P["POST /logout<br/>ログアウト処理"]
    PROFILE_G --> |ログアウト| LOGOUT_P
    LOGOUT_P --> |リダイレクト|LOGIN_G
```