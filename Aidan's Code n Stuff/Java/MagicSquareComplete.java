import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    static int[] squares = new int[]{8,1,6,
                                     3,5,7,
                                     4,9,2,
                                    
                                     6,1,8,
                                     7,5,3,
                                     2,9,4,
                                     
                                     4,9,2,
                                     3,5,7,
                                     8,1,6,
                                     
                                     2,9,4,
                                     7,5,3,
                                     6,1,8,
                                     
                                     8,3,4,
                                     1,5,9,
                                     6,7,2,
                                         
                                     4,3,8,
                                     9,5,1,
                                     2,7,6,
                                         
                                     6,7,2,
                                     1,5,9,
                                     8,3,4,
                                     
                                     2,7,6,
                                     9,5,1,
                                     4,3,8
                                     };
    static int formingMagicSquare(int[][] s) {
        // load in every possible magic square (there isn't that many of them)
        
        int cost1 = diff(s, 0);
        //System.out.println("our cost: " + cost1);
        int cost2 = diff(s, 9);
        //System.out.println("our cost: " + cost2);
        int cost3 = diff(s, 18);
        //System.out.println("our cost: " + cost3);
        int cost4 = diff(s, 27);
        //System.out.println("our cost: " + cost4);
        int cost5 = diff(s, 36);
        //System.out.println("our cost: " + cost5);
        int cost6 = diff(s, 45);
        //System.out.println("our cost: " + cost6);
        int cost7 = diff(s, 54);
        //System.out.println("our cost: " + cost7);
        int cost8 = diff(s, 63);
        //System.out.println("our cost: " + cost1);
        int min1 = Math.min(cost1, Math.min(cost2, Math.min(cost3, cost4)));
        int min2 = Math.min(cost5, Math.min(cost6, Math.min(cost7, cost8)));
        return (Math.min(min1, min2));
    }
    
    private static int diff(int[][] numbers, int startIndex) {
        int cost = 0;
        int index = startIndex;
        //System.out.println("Starting at index " + index);
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
               //System.out.println("adding " + squares[index]);
               //System.out.println("number is " + numbers[i][j]);
	           cost += Math.abs(numbers[i][j] - squares[index]);
               //System.out.println("we have added " + (index + 1));
               index++;
      }
    }
        
    //System.out.println("cost is " + cost);
    return cost;
  }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int[][] s = new int[3][3];
        for(int s_i = 0; s_i < 3; s_i++){
            for(int s_j = 0; s_j < 3; s_j++){
                s[s_i][s_j] = in.nextInt();
            }
        }
        int result = formingMagicSquare(s);
        System.out.println(result);
        in.close();
    }
}