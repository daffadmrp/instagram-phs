// Berfungsi untuk me-replace (override) Service Worker lama yang mungkin masih tersangkut di browser
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
