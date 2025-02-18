export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          メールを確認してください
        </h2>
        <p className="text-gray-600 mb-8">
          登録したメールアドレスに確認メールを送信しました。<br />
          メール内のリンクをクリックして、登録を完了してください。
        </p>
        <div className="text-sm text-gray-500">
          ※メールが届かない場合は、迷惑メールフォルダもご確認ください。
        </div>
      </div>
    </div>
  )
} 