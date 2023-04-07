const PAGE_SIZE = 10;

export const fetchUsers = async (pageParam, queryKey) => {
  const { user } = queryKey[1];

  if (!user) return [];

  const response = await fetch(`https://api.github.com/search/users?q=${user}&page=${pageParam}&per_page=${PAGE_SIZE}`);
  
  if (!response.ok) {
    throw new Error(`Error with requesting users ${user}`);
  }

  return response.json();
};

export const fetchUser = async ({ queryKey }) => {
  const id = queryKey[1];
  
  const response = await fetch(`https://api.github.com/users/${id}`);

  if (!response.ok) {
    throw new Error(`Error with requesting user ${id}`);
  }

  return response.json();
};