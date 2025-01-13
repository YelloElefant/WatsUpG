let notificationCenter = document.getElementById("notificationWrapper");
class Notification {
   constructor(message) {
      this.element = document.createElement("div");
      this.element.innerHTML = message;
      this.element.classList.add("notification");
   }

   show() {
      console.log(this.element.innerHTML);
      this.element.style.opacity = 0;
      notificationCenter.appendChild(this.element);
      setTimeout(() => {
         this.element.style.opacity = 1;
      }, 100);
   }

   hide() {
      console.log("Notification hidden");
      this.element.style.opacity = 0;
      setTimeout(() => {
         this.remove();
      }, 500);

   }

   remove() {
      notificationCenter.removeChild(this.element);
   }
}

function makeNotification(message, duration) {
   let notification = new Notification(message);
   notification.show();
   setTimeout(() => {
      notification.hide();
   }, duration);

}

async function getNotifications() {
   let notifications = await fetch("./Api/GetAllNotifications.php", { mode: 'no-cors' }).then(response => response.text());
   notifications = JSON.parse(notifications);
   for (let i = 0; i < notifications.length; i++) {
      const notification = notifications[i];
      makeNotification(notification, 5000);
      await sleep(500);
      let response = await fetch("http://192.168.1.29:2525/Api/DeleteNotification.php?count=" + notifications.length, { mode: 'no-cors' }).then(response => response.text())
   }

}

setInterval(() => {
   getNotifications();
}, 2000);

function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}