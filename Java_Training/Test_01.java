interface in1{
    Integer level();
}

class tt implements in1{
    public Integer level(){
        return 1;
    }
}

public class Test_01 {
    private Test_01() {
    }

    /**
     * Says hello to the world.
     * @param args The arguments of the program.
     */
    public static void main(String[] args) {
        System.out.println("Hello World!");
        tt t1 = new tt();
        System.out.println(t1.level());
    }
}