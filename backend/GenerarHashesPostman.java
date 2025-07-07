import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerarHashesPostman {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        System.out.println("=== GENERANDO HASHES BCrypt PARA CONTRASEÑAS ORIGINALES DE POSTMAN ===\n");
        
        // Contraseñas originales de Postman
        String[] passwords = {
            "admin1234",
            "supervisor123", 
            "user123"
        };
        
        String[] emails = {
            "admin@erp.com",
            "supervisor@erp.com",
            "user@erp.com"
        };
        
        for (int i = 0; i < passwords.length; i++) {
            String password = passwords[i];
            String email = emails[i];
            String hash = encoder.encode(password);
            
            System.out.println("Usuario: " + email);
            System.out.println("Contraseña: " + password);
            System.out.println("Hash BCrypt: " + hash);
            System.out.println("Comando SQL:");
            System.out.println("UPDATE usuario SET password = '" + hash + "' WHERE correo = '" + email + "';");
            System.out.println();
        }
        
        System.out.println("=== SCRIPT SQL COMPLETO ===");
        System.out.println("USE erp_sena;");
        System.out.println();
        
        for (int i = 0; i < passwords.length; i++) {
            String password = passwords[i];
            String email = emails[i];
            String hash = encoder.encode(password);
            
            System.out.println("-- " + email + " / " + password);
            System.out.println("UPDATE usuario SET password = '" + hash + "' WHERE correo = '" + email + "';");
        }
        
        System.out.println();
        System.out.println("-- Verificar usuarios actualizados");
        System.out.println("SELECT correo, nombre, rol, LENGTH(password) as longitud_hash FROM usuario WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com');");
    }
} 