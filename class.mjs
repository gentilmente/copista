export default new (class Camera {
  init(cb) {
    //stuff

    cb();
    return 'end init';
  }

  getOtherStuff(cb) {
    return 'otherStuff';
  }
})();
