class FakeFileSystem {
  constructor() {
    if (!localStorage.getItem("wtxt-fs")) {
      localStorage.setItem("wtxt-fs", JSON.stringify({}));
    }
    this.fs = JSON.parse(localStorage.getItem("wtxt-fs"));
  }

  getFS() {
    return this.fs;
  }

  getFSDir(path) {
    var fs = this.getFS();
    var cur_fs = fs;
    var cur_path = path;
    while (path.length !== 0) {
      cur_path = path[0];
      if (cur_path === "") {
        break;
      }
      if (Object.keys(cur_fs).indexOf(cur_path) === -1) {
        throw new Error("Path does not exist.");
      }
      cur_fs = cur_fs[cur_path];
      path.shift();
    }
    return cur_fs;
  }

  saveFS() {
    localStorage.setItem("wtxt-fs", JSON.stringify(this.fs));
  }

  parsePath(path) {
    if (typeof path !== "string") {
      throw new Error("Invalid parameter to parsePath");
    }
    if (path[0] !== "/") {
      throw new Error("Invalid path");
    }
    path = path.split("/");
    path.shift();
    return path;
  }

  readFile(filePath) {
    filePath = this.parsePath(filePath);
    const filename = filePath.pop();
    const filesystem = this.getFSDir(filePath);
    if (
      filesystem[filename] !== undefined &&
      typeof filesystem[filename] == "object"
    ) {
      throw new Error("Cannot read a directory.");
    }
    return filesystem[filename] || null;
  }

  writeFile(filePath, data) {
    filePath = this.parsePath(filePath);
    const filename = filePath.pop();
    const filesystem = this.getFSDir(filePath);
    console.log(filesystem);
    if (
      filesystem[filename] !== undefined &&
      typeof filesystem[filename] == "object"
    ) {
      throw new Error("Cannot write to a directory.");
    }
    filesystem[filename] = data;
    this.saveFS();
  }

  deleteFile(filePath) {
    filePath = this.parsePath(filePath);
    const filename = filePath.pop();
    const filesystem = this.getFSDir(filePath);
    delete filesystem[filename];
    this.saveFS();
  }

  createDir(path) {
    path = this.parsePath(path);
    var fs = this.getFS();
    var cur_path;
    var cur_fs = fs;
    while (path.length !== 0) {
      cur_path = path[0];
      if (Object.keys(cur_fs).indexOf(cur_path) === -1) {
        cur_fs[cur_path] = {};
      }
      cur_fs = cur_fs[cur_path];
      path.shift();
    }
    this.saveFS();
  }
}

const fs = new FakeFileSystem();
fs.createDir("/Users/whtxt/Documents");
fs.createDir("/Users/whtxt/Downloads");
fs.createDir("/Users/whtxt/Music");
fs.createDir("/Users/whtxt/Photos");
fs.createDir("/Users/whtxt/Videos");
