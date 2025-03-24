<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Event;
use App\Models\Reservation;
use App\Models\User;
// use Faker\Provider\ar_EG\Address;

class EventReservationSuccessMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $event;
    public $user;
    public $reservation;

    /**
     * @param Event $event
     * @param User $user
     * @param Reservation $reservation
     */

    public function __construct(Event $event,User $user,Reservation $reservation)
    {
        $this->event = $event;
        $this->user = $user;
        $this->reservation = $reservation;
    }

    /**
     * メールの送信者情報と件名を設定
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('no-reply@example.com', 'MeetupLink管理システム'),
            subject: 'イベント予約完了のお知らせ',
        );
    }

    /**
     * メールの内容を指定
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.reservation.success',
            with: [
                'event' => $this->event,
                'user' => $this->user,
                'reservation' => $this->reservation,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
