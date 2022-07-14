// 获取本地数据
export function getLocal(key) {
  let data = localStorage.getItem(key);

  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log(e);
  }
  return data;
}

// 存储数据到本地
export function setLocal(key, value) {
  localStorage.setItem(
    key,
    typeof value === "object" ? JSON.stringify(value) : value
  );
}
