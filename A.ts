export class A {
    #n = 0;

    method() {
        return 42;
    }

    get getter() {
        return 1337;
    }

    set setter(n: number) {
        this.#n = n;
    }
}
