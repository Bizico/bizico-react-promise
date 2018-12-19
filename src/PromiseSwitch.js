class PromiseSwitch {
  constructor() {
    this.lastPromiseKey = this.generateKey();
  }

  generateKey = () => Date.now();

  call = (promise) => {
    this.lastPromiseKey = this.generateKey();
    const key = this.lastPromiseKey;
    return new Promise((resolve, reject) => {
      promise.then((data) => {
        if (key === this.lastPromiseKey) {
          resolve(data);
        }
      }).catch((error) => {
        if (key === this.lastPromiseKey) {
          reject(error);
        }
      });
    });
  };
}

export default PromiseSwitch;
