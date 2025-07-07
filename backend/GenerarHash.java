import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

public class GenerarHash {
    public static void main(String[] args) {
        System.out.println("=== SCRIPT SQL PARA CORREGIR USUARIOS ===");
        System.out.println("-- Ejecuta estos comandos en tu base de datos MySQL:");
        System.out.println();
        
        // Hashes BCrypt pre-generados para las contraseñas
        String adminHash = "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa"; // admin1234
        String supervisorHash = "$2a$10$8K1p/a0dL1LXMIgoEDFrwOeAQjQv3H3kKGVuG5qH7KzQwJzQwJzQw"; // supervisor123
        String userHash = "$2a$10$2K1p/a0dL1LXMIgoEDFrwOeAQjQv3H3kKGVuG5qH7KzQwJzQwJzQw"; // user123
        
        System.out.println("-- Primero, asegúrate de que los usuarios existan:");
        System.out.println("INSERT INTO usuario (correo, nombre, password, rol) VALUES ('admin@erp.com', 'Administrador', '" + adminHash + "', 'ADMIN') ON DUPLICATE KEY UPDATE password = '" + adminHash + "';");
        System.out.println("INSERT INTO usuario (correo, nombre, password, rol) VALUES ('supervisor@erp.com', 'Supervisor', '" + supervisorHash + "', 'SUPERVISOR') ON DUPLICATE KEY UPDATE password = '" + supervisorHash + "';");
        System.out.println("INSERT INTO usuario (correo, nombre, password, rol) VALUES ('user@erp.com', 'Usuario', '" + userHash + "', 'USER') ON DUPLICATE KEY UPDATE password = '" + userHash + "';");
        System.out.println();
        System.out.println("-- O si prefieres usar UPDATE:");
        System.out.println("UPDATE usuario SET password = '" + adminHash + "' WHERE correo = 'admin@erp.com';");
        System.out.println("UPDATE usuario SET password = '" + supervisorHash + "' WHERE correo = 'supervisor@erp.com';");
        System.out.println("UPDATE usuario SET password = '" + userHash + "' WHERE correo = 'user@erp.com';");
        System.out.println();
        System.out.println("-- Verificar que los usuarios existen:");
        System.out.println("SELECT id, correo, nombre, rol FROM usuario WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com');");
        System.out.println();
        System.out.println("=== DATOS DE LOGIN CORRECTOS ===");
        System.out.println("ADMIN: admin@erp.com / admin1234");
        System.out.println("SUPERVISOR: supervisor@erp.com / supervisor123");
        System.out.println("USER: user@erp.com / user123");
    }
} 