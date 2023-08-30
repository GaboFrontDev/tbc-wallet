
export function parseJwt(token: string) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export function deletePromo(id: string) { 
  const apiUrl = `${window.location.origin}/api/promo`;

  return fetch(apiUrl, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}