export const mockPatchGoal = async (id: number, data: any) => {
  // モックデータ
  const mockGoal = {
    id: 123,
    title: "更新後のタイトル",
    type: "medium",
    color: "blue",
    boardId: 2
  };

  // モックのレスポンスを返す
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockGoal);
    }, 500); // 0.5秒の遅延を模擬
  });
}; 