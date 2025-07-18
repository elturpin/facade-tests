type A = number;
type B = string;

function a(arg: A): void;
function a(arg: B): void;
function a(arg: A | B): void;
function a(arg: A | B) {}

const b = 42 as A | B;

a(b);
