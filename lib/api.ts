export const patchGoal = async (id: number, data: any) => {
  const response = await fetch(`/api/goals/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}; 