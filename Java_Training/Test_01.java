

public class Test_01{
    public static void main(String[] args){
        System.out.println("Hello world!");
        Person p = new Person("张三");
        p.sayHello();
        for(int i = 0; i < 10; i++){          
            switch(i % 2){
                case 0:
                System.out.println(String.format("%d偶数", i));
                break;
                default:
                System.out.println(String.format("%d奇数", i));
            }
        }
    }
}

class Person{
    String name;
    public Person(String name){
        this.name = name;
    }
    public void sayHello(){
        String str = "my name is " + this.name;
        System.out.println(str);
    }
}