import { Auth } from '@/components/Auth'
import { mockPatchGoal } from '@/lib/mockApi'

export default function LoginPage() {
  const handleTestMockApi = async () => {
    const response = await mockPatchGoal(123, {
      title: "更新後のタイトル",
      type: "medium",
      color: "blue",
      boardId: 2
    });
    console.log("モックAPIのレスポンス:", response);
  }

  return (
    <div>
      <h1>ログインページ</h1>
      <Auth />
      <button onClick={handleTestMockApi}>モックAPIをテスト</button>
    </div>
  )
} 