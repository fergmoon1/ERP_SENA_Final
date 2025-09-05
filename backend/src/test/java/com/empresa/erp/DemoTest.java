package com.empresa.erp;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

class DemoTest {

    @Test
    void sumaBasica() {
        int resultado = 2 + 3;
        assertThat(resultado).isEqualTo(5);
    }
}

