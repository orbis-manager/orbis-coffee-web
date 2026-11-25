"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Text from "@/components/ui/Text";
import Textarea from "@/components/ui/Textarea";
import type { Locale } from "@/lib/i18n";

const copy = {
  vi: {
    eyebrow: "Gửi lời nhắn", title: "Trao đổi cùng ANH COFFEE", description: "Điền thông tin bên dưới. Chúng tôi sẽ mở ứng dụng email với nội dung đã soạn để bạn gửi đến đội ngũ ANH COFFEE.",
    name: "Họ và tên", namePlaceholder: "Nguyễn Minh An", email: "Email", emailPlaceholder: "ban@email.com", phone: "Số điện thoại", optional: "Không bắt buộc",
    subject: "Chủ đề", choose: "Chọn nội dung cần trao đổi", subjects: ["Tư vấn sản phẩm", "Đặt hàng", "Hợp tác bán sỉ / đối tác", "Quà tặng doanh nghiệp", "Khác"],
    message: "Lời nhắn", messagePlaceholder: "Chia sẻ với chúng tôi điều bạn đang quan tâm...", send: "Soạn email", privacy: "Thông tin chỉ được dùng để phản hồi yêu cầu này.",
    emailReady: "Đã mở ứng dụng email với nội dung lời nhắn. Vui lòng gửi email để hoàn tất liên hệ.",
    required: "Vui lòng điền đầy đủ các trường bắt buộc.",
  },
  en: {
    eyebrow: "Write to us", title: "Start a conversation", description: "Fill in the details below. We’ll open your email app with a prepared message for the ANH COFFEE team.",
    name: "Full name", namePlaceholder: "Alex Morgan", email: "Email address", emailPlaceholder: "you@email.com", phone: "Phone number", optional: "Optional",
    subject: "Subject", choose: "Choose an inquiry topic", subjects: ["Product information", "Order inquiry", "Wholesale / partnership", "Corporate gifting", "Other"],
    message: "Message", messagePlaceholder: "Tell us what you have in mind...", send: "Prepare email", privacy: "Your details are used only to respond to this inquiry.",
    emailReady: "Your email app has opened with the message prepared. Send the email to complete your inquiry.",
    required: "Please complete all required fields.",
  },
};

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-space-xs">
      <label htmlFor={htmlFor} className="font-sans text-label-md uppercase tracking-[0.08em] text-on-surface">
        {label}{optional ? <span className="ml-space-xs text-on-surface-variant/70 normal-case tracking-normal">({optional})</span> : <span className="ml-1 text-tertiary">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm({ locale }: { locale: Locale }) {
  const labels = copy[locale];
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) {
      setStatus(labels.required);
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "");
    const body = [
      `${labels.name}: ${name}`,
      `${labels.email}: ${email}`,
      phone ? `${labels.phone}: ${phone}` : "",
      "",
      message,
    ].filter(Boolean).join("\n");
    const mailto = `mailto:coffeebyorbis@gmail.com?subject=${encodeURIComponent(`[ANH COFFEE] ${subject}`)}&body=${encodeURIComponent(body)}`;

    setStatus(labels.emailReady);
    window.location.href = mailto;
  }

  return (
    <section className="bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-sm">
      <div className="mb-space-lg flex flex-col gap-space-xs">
        <Text as="span" scale="label-sm" className="text-secondary uppercase tracking-[0.16em]">{labels.eyebrow}</Text>
        <Text as="h2" scale="headline-md" className="text-on-surface">{labels.title}</Text>
        <Text as="p" scale="body-sm" className="text-on-surface-variant">{labels.description}</Text>
      </div>

      <form className="flex flex-col gap-space-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          <Field label={labels.name} htmlFor="contact-name">
            <Input id="contact-name" name="name" autoComplete="name" placeholder={labels.namePlaceholder} required />
          </Field>
          <Field label={labels.email} htmlFor="contact-email">
            <Input id="contact-email" name="email" type="email" autoComplete="email" placeholder={labels.emailPlaceholder} required />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          <Field label={labels.phone} htmlFor="contact-phone" optional={labels.optional}>
            <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
          </Field>
          <Field label={labels.subject} htmlFor="contact-subject">
            <Select id="contact-subject" name="subject" defaultValue="" required>
              <option value="" disabled>{labels.choose}</option>
              {labels.subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
            </Select>
          </Field>
        </div>

        <Field label={labels.message} htmlFor="contact-message">
          <Textarea id="contact-message" name="message" placeholder={labels.messagePlaceholder} rows={5} required />
        </Field>

        {status && (
          <div role="status" aria-live="polite" className="flex items-start gap-space-sm rounded bg-secondary-container/60 p-space-md text-on-secondary-container">
            <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <Text as="p" scale="body-sm" className="font-medium">{status}</Text>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-space-xs">
          <Button type="submit" variant="primary" size="lg">
            {labels.send}<Icon name="arrowUpRight" className="h-[18px] w-[18px]" />
          </Button>
          <div className="flex items-center gap-space-xs text-on-surface-variant/80">
            <Icon name="shield" className="h-4 w-4 shrink-0 text-primary" />
            <Text as="span" scale="label-sm">{labels.privacy}</Text>
          </div>
        </div>
      </form>
    </section>
  );
}
