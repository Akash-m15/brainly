export function random(len:number)
{
  const q = "qwertuyioppoosgfjklalfznvnnv7894561230";
  let ans="";
  for(let i = 0 ; i < len;i++)
  {
    ans += q[(Math.random() * q.length)]
  }
  return ans;
}