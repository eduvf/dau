use std::env;
use std::fs;

fn main() {
    let args: Vec<String> = env::args().collect();

    match args.len() {
        1 => todo!(),
        2 => {
            match fs::read_to_string(&args[1]) {
                Ok(s) => println!("{}", s),
                Err(e) => println!("{}", e),
            };
        }
        _ => todo!(),
    }
}
