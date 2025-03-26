@component('mail::message')
# イベント予約完了のお知らせ

{{ $user->name }} 様
イベント予約が完了しました

- 開催日: {{$event->event_date}}
- 予約人数: {{$reservation->quantity}}
- 内容: {{$event->description}}

イベント当日はお気をつけてお越しください。

MeetupLink管理局

@endcomponent
