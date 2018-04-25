import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;
//this project attemps to find closest magic square to inputted matrix via brute force (create every magic square in existance and tests them all). It doesn't work. There is a much easier way.
public class Solution {

    static int formingMagicSquare(int[][] s) {
        int[][] curArray = new int[s.length][s.length];
        int cost = Integer.MAX_VALUE;
        int curX = 0;
        int curXVal = 0;
        
        int total1 = 0;
        int[] wipeAllValuesTo = {0,0};
        for (int i = 0; i < s.length; i++) {
            for (int x = 0; x < s.length; x++) {
                total1 += s[i][x];
                //System.out.println("our total is " + total1);
            }
        }
        int calculations = 0;
        for (int num = 0; num <= 9; num++) {
            
            for (int curY = 0; curY < curArray.length; curY++) {
                //System.out.println("we are going to change values on the y axis " + curY);
                for (int i = 0; i < curArray.length; i++) {
                    //System.out.println("we are changing values on the x axis " + i + " out of " + curArray.length);
                    int tempCost = 0;
                    for (int x = 0; x <= 9; x++) {
                        curArray = WipeVals(curArray, i, curY, num);
                        
                        //showNewArray(curArray);
                        
                        if (curArray[2][2] == 9) {
                            curArray[2][2] = Math.abs(num - 9);
                        }
                        //System.out.println("we are changing " + i + " " + curY + " from " + curArray[i][curY] + " to " +                           x);
                        curArray[i][curY] = x;
                        //System.out.println("the new value is " + curArray[i][curY] + " at " + i + " " + curY);
                        showNewArray(curArray);
                        if (checkMagicSquare(curArray)) {
                            System.out.println("Matrix is a perfect Square!");
                            //stem.out.println("the number is " + total1);
                            int total2 = 0;
                            for (int n = 0; n < curArray.length; n++) {
                                for (int m = 0; m < curArray.length; m++) {
                                    total2 += curArray[m][n];
                                }
                            }
                            tempCost = Math.abs(total1 - total2);
                            System.out.println("the new tempCost is " + tempCost);
                            System.out.println("comparing that with " + cost);
                            if (tempCost < cost) {
                                cost = tempCost;
                            }
                        }
                        
                        calculations++;
                    }
                    //System.out.println("because we are there, we are adding one index to wipeAllValuesTo");
                    calculations++;
                    //System.out.println("we are now wiping all values to " + wipeAllValuesTo[0] + " " + wipeAllValuesTo[1]);   
                    

                }
            }   
            
            //System.out.println("we have now broken out of the loop! adding one to defualt value...");
            curXVal++;
            //System.out.println("default value is now " + curXVal);
        }
        calculations++;
        //System.out.println(calculations);
        return cost;
        
    }
    static void showNewArray(int[][] s) { 
        for (int i = 0; i < s.length; i++) {
            for (int x = 0; x < s.length; x++) {
                System.out.print(s[x][i] + " ");
            }
            System.out.println("\n");
        }
        System.out.println("-----");
    
    }
    
    static int[][] WipeVals(int[][] arrayToWipe, int x, int y, int replace) {
        int wipeValX = 0;
        int wipeValY = 0;
        int[] wipeTo = {x, y};
        int[][] wipedMatrix = arrayToWipe;
        //System.out.println("We are wiping this array: ");
        //showNewArray(wipedMatrix);
        //System.out.println("wiping to " + y + " " + x);
        do {
            if (wipeValY == y && wipeValX == x) {
                break;
            }
            //System.out.println("wipe value y " + wipeValY + " compared to y " + y);
            //System.out.println("wipe value x " + wipeValX + " compared to x " + x);
            if (wipeValX >= 3) {
                //System.out.println("we are now wiping on new row. row is " + (wipeValY + 1));
                wipeValX = 0;
                wipeValY++;
                if (wipeValY > 2) {
                    break;
                }
             }
            //System.out.println("wiping " + wipeValY + " " + wipeValX + " which has value of " + wipedMatrix[wipeValX][wipeValY] + ", making it " + replace);
            if (replace != 0) {
                wipedMatrix[wipeValX][wipeValY] = replace - 1;
            }
            
            else {
                wipedMatrix[wipeValX][wipeValY] = replace;
            }
            
            //System.out.println("new value at " + wipeValY + " " + wipeValX + " = " + wipedMatrix[wipeValY][wipeValX]);
            wipeValX++;
            //System.out.println("we are now wiping at " + wipeValX);
        } while ((wipeValY <= y));
        //System.out.println("We are done! New array: ");
        return wipedMatrix;
        
    }
    
    static boolean checkMagicSquare(int[][] s){
        int total = 0;
        
        total = s[0][0] + s[0][1] + s[0][2];
        //System.out.println(s[0][0] + "+" + s[0][1] + "+" + s[0][2] +"=" + total);
        //showNewArray(s);
        for (int i = 0; i < s.length; i++) {
            int tempTotal = 0;
            //int curY = 0;
            for (int x = 0; x < s.length; x++) {
                //System.out.println("adding " + s[x][i] + " to " + tempTotal);
                tempTotal += s[x][i];
            }
            
            //System.out.println("temptotal is now " + total);
            
            if (tempTotal != total) {
                //System.out.println("Broken!");
                return false;
            }
            
            //curY++;
        }
        
        System.out.println("first test completed.");
        
        for (int n = 0; n < s.length; n++) {
            int curX = 0;
            int tempTotal = 0;
            for (int y = 0; y < s.length; y++) {
                tempTotal += s[curX][y];
            }
            if (tempTotal != total) {
                return false;
            }
            curX++;
            
        }
        
        if (total != s[0][2] + s[1][1] + s[2][0]) {
            return false;
        }
        
        if (total != s[0][0] + s[1][1] + s[2][2]) {
            return false;
        }
        
        return true;
        
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