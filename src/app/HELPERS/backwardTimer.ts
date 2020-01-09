export function timer(countDownDate) {
  const now = new Date().getTime();

  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (distance < 0) {
    return;
  }

  return (
    (days ? days + "d " : "") +
    (hours ? hours + "h " : "") +
    (minutes ? minutes + "m " : "0m ") +
    (seconds ? seconds + "s " : "0s")
  );
}
