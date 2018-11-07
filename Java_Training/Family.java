abstract class Parent{
    public String name;
    public int age;

    public Parent(String name, int age){
        this.name = name;
        this.age = age;
    }

    abstract public void say();
    public abstract void speak();
}

class Children extends Parent{
    public Children(String name, int age){
        super(name,age);
    }
    public void say(){
        System.out.println("ok");
    }
    public void speak(){
        System.out.println("hello");
    }
}

public class Family{
    public static void main(String[] args){
        Children child = new Children("Jack", 12);
        child.say();
        child.speak();
    }
}